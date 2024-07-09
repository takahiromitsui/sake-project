package helpers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	// "log"
	"os"
	"path/filepath"

	// "github.com/joho/godotenv"
	"github.com/takahiromitsui/sake-project/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func BrandEnUpdate(client *mongo.Client, fileName string) (error) {
	p:= filepath.Join("internal", "data", fileName)
	file, err := os.Open(p)
	if err != nil {
		fmt.Println("Error opening file")
		return err
	}
	defer file.Close()
	var brands []models.Brand
	err = json.NewDecoder(file).Decode(&brands)
	if err != nil {
		fmt.Println("Error decoding file")
		return err
	}
	collection := client.Database("sake").Collection("brands")
	for _, brand := range brands {
		fmt.Println(brand.ID, brand.En)
		_, err = collection.UpdateOne(context.TODO(), bson.M{"id": brand.ID}, bson.M{"$set": bson.M{"en": brand.En}})
		if err != nil {
			fmt.Println("Error updating document")
			return err
		}
	}
	return nil
}
type FlavorResponse struct {
	FlavorCharts []struct {
		BrandId int     `json:"brandId"`
		F1      float64 `json:"f1"`
		F2      float64 `json:"f2"`
		F3      float64 `json:"f3"`
		F4      float64 `json:"f4"`
		F5      float64 `json:"f5"`
		F6      float64 `json:"f6"`
	} `json:"flavorCharts"`
}

func InsertFlavors(client *mongo.Client) (error) {
	url := "https://muro.sakenowa.com/sakenowa-data/api/flavor-charts"
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error fetching data")
		return err
	}
	defer resp.Body.Close()
	var flavorResponse FlavorResponse
	if err := json.NewDecoder(resp.Body).Decode(&flavorResponse); err != nil {
		fmt.Println("Error decoding data")
		return err
	}
	brandUdMap := make(map[int]primitive.ObjectID)
	brandsCollection := client.Database("sake").Collection("brands")
	flavorsCollection := client.Database("sake").Collection("flavors")
	cursor, err := brandsCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		fmt.Println("Error finding documents")
		return err
	}
	defer cursor.Close(context.TODO())
	for cursor.Next(context.TODO()) {
		var brand models.Brand
		if err = cursor.Decode(&brand); err != nil {
			fmt.Println("Error decoding document")
			return err
		}
		brandUdMap[brand.ID] = brand.MongoID
	}
	var flavors []interface{}
	for _, fc := range  flavorResponse.FlavorCharts {
		if mongoId, ok := brandUdMap[fc.BrandId]; ok {
			flavors = append(flavors, models.Flavor{
				F1: fc.F1,
				F2: fc.F2,
				F3: fc.F3,
				F4: fc.F4,
				F5: fc.F5,
				F6: fc.F6,
				Brand: mongoId,
			})
		}
	}
	if len(flavors) > 0 {
		_, err = flavorsCollection.InsertMany(context.TODO(), flavors)
		if err != nil{
			log.Fatal("Error inserting documents")
			return err
		}
	}
	fmt.Println("Inserted", len(flavors), "flavors")
	return nil
}

// func main() {
// 	err := godotenv.Load()
// 	if err != nil {
//     log.Fatal("Error loading .env file")
// 		return
//   }

// 	uri := os.Getenv("DB_CONN_STR")
// 	// ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	// defer cancel()
// 	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
// 	if err != nil {
// 		log.Fatal("Error connecting to MongoDB")
// 		return
// 	}
// 	// helpers.ExportJson(client, "brands")
// 	BrandEnUpdate(client, "brands_0.json")
// 	defer client.Disconnect(context.TODO())
// }