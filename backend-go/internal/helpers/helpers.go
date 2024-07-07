package helpers

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


func ExportJson(client *mongo.Client, collection_name string) (error){
	const pageSize = 100
	collection := client.Database("sake").Collection(collection_name)
	total, err := collection.CountDocuments(context.TODO(), nil)
	if err != nil {
		return err
	}
	 totalPages := int(total / pageSize)
	for page := 0; page <= totalPages; page++ {
		opts := options.Find().SetSkip(int64(page * pageSize)).SetLimit(pageSize)
		cursor, err := collection.Find(context.TODO(), bson.D{}, opts)
		if err != nil {
			return err
		}
		defer cursor.Close(context.TODO())
		var results []bson.M
		if err = cursor.All(context.TODO(), &results); err != nil {
			return err
		}
		fileName := "internal/data/"+collection_name + "_" + string(page) + ".json"
		file, err := os.Create(fileName)
		if err != nil {
			return err
		}
		defer file.Close()
		jsonData, err := json.MarshalIndent(results, "", "  ")
		if err != nil {
			return err
		}
		_, err = file.Write(jsonData)
		if err != nil {
			return err
		}
		fmt.Println("Exported", fileName)
	}
	return nil
}