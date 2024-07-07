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


func ExportJson(client *mongo.Client, collectionName string) (error){
	fmt.Println("Exporting", collectionName)
	const pageSize = 100
	collection := client.Database("sake").Collection(collectionName)
	total := 3167
	totalPages := int(total / pageSize)
	fmt.Println("Total Pages", totalPages)
	for page := 0; page <= totalPages; page++ {
		opts := options.Find().SetSkip(int64(page * pageSize)).SetLimit(pageSize)
		cursor, err := collection.Find(context.TODO(), bson.D{}, opts)
		if err != nil {
			fmt.Println("Error finding documents")
			return err
		}
		defer cursor.Close(context.TODO())
		var results []bson.M
		if err = cursor.All(context.TODO(), &results); err != nil {
			fmt.Println("Error decoding documents")
			return err
		}
		fileName := fmt.Sprintf("%s_%d.json", collectionName, page)
		file, err := os.Create(fileName)
		if err != nil {
			fmt.Println("Error creating file")
			return err
		}
		defer file.Close()
		jsonData, err := json.MarshalIndent(results, "", "  ")
		if err != nil {
			fmt.Println("Error marshalling data")
			return err
		}
		_, err = file.Write(jsonData)
		if err != nil {
			fmt.Println("Error writing data")
			return err
		}
		fmt.Println("Exported", fileName)
	}
	return nil
}