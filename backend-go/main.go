package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	err := godotenv.Load()
	if err != nil {
    log.Fatal("Error loading .env file")
  }

	uri := os.Getenv("DB_CONN_STR")
	fmt.Println(uri)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)
}