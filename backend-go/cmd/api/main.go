package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)
const port = ":8000"

func main() {
	client, err := run()
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	defer client.Disconnect(ctx)
	log.Println("Server running on port", port)
	srv := &http.Server{
		Addr: port,
		Handler: routes(),
	}
	err = srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}

func run() (*mongo.Client, error){
	err := godotenv.Load()
	if err != nil {
    log.Fatal("Error loading .env file")
		return nil, err
  }

	uri := os.Getenv("DB_CONN_STR")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("Error connecting to MongoDB")
		return nil, err
	}
	log.Println("Connected to database")
	return client, nil
}