package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/takahiromitsui/sake-project/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	client *mongo.Client
}

func NewRepository(client *mongo.Client) *Repository {
	return &Repository{client: client}
}


func (r *Repository) GetBrandsByAreaName(areaName string) ([]models.Brand, error) {
	ctx,cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	var area models.Area
	err := r.client.Database("sake").Collection("areas").FindOne(ctx, bson.M{"en": areaName}).Decode(&area)
	if err != nil {
		return nil, err
	}
	fmt.Println(area)
	var breweries []models.Brewery
	cursor, err := r.client.Database("sake").Collection("breweries").Find(ctx, bson.M{"area": area.MongoID})
	if err != nil {
			return nil, err
		}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var brewery models.Brewery
		if err = cursor.Decode(&brewery); err != nil {
			return nil, err
		}
		breweries = append(breweries, brewery)
	}
	fmt.Println(breweries)
	breweryIds := make([]interface{}, len(breweries))
	for i, brewery := range breweries {
		breweryIds[i] = brewery.MongoID
	}
	var brands []models.Brand
	cursor, err = r.client.Database("sake").Collection("brands").Find(ctx, bson.M{"brewery": bson.M{"$in": breweryIds}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	if err = cursor.All(ctx, &brands); err != nil {
		return nil, err
	}
	return brands, nil
}