package repository

import (
	"context"
	"time"

	"github.com/takahiromitsui/sake-project/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	client *mongo.Client
}

func NewRepository(client *mongo.Client) *Repository {
	return &Repository{client: client}
}


func (r *Repository) GetBrandsByAreaName(areaName string) ([]models.Brand, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	
	var area models.Area
	err := r.client.Database("sake").Collection("areas").FindOne(ctx, bson.M{"en": areaName}).Decode(&area)
	if err != nil {
		return nil, err
	}
	AreaMap := make(map[primitive.ObjectID]models.Area)
	AreaMap[area.MongoID] = area
	
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
	
	breweryIds := make([]primitive.ObjectID, len(breweries))
	breweryMap := make(map[primitive.ObjectID]models.Brewery)
	for i, brewery := range breweries {
		brewery.AreaDetails = &area
		breweryIds[i] = brewery.MongoID
		breweryMap[brewery.MongoID] = brewery
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
	brandIds := make([]primitive.ObjectID, len(brands))
	for i, brand := range brands {
		brandIds[i] = brand.MongoID
		if brewery, found := breweryMap[brand.Brewery]; found {
			brands[i].BreweryDetails = &brewery 
		}
	}
	var flavors []models.Flavor
	flavorsCursor, err := r.client.Database("sake").Collection("flavors").Find(ctx, bson.M{"brand": bson.M{"$in": brandIds}})
	if err != nil {
		return nil, err
	}
	defer flavorsCursor.Close(ctx)
	if err = flavorsCursor.All(ctx, &flavors); err != nil {
		return nil, err
	}
	flavorMap := make(map[primitive.ObjectID]models.Flavor)
	for _, flavor := range flavors {
		flavorMap[flavor.Brand] = flavor
	}
	for i, brand := range brands {
		if flavor, found := flavorMap[brand.MongoID]; found {
			brands[i].FlavorDetails = &flavor
		} else {
			brands[i].FlavorDetails = nil
		}
	}
	
	return brands, nil
}
