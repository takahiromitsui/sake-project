package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Assuming Area struct definition
type Area struct {
	MongoID primitive.ObjectID `bson:"_id,omitempty" json:"mongoId,omitempty"`
	ID   int 								`bson:"id" json:"id"`
	Name string             `bson:"name"`
	En   string             `bson:"en"`
}

// Brewery struct definition
type Brewery struct {
	MongoID primitive.ObjectID `bson:"_id,omitempty" json:"mongoId,omitempty"`
	ID    int                `bson:"id" json:"id"`
	Name  string             `bson:"name" json:"name"`
	En    string             `bson:"en" json:"en"`
	Area  primitive.ObjectID `bson:"area" json:"area"`
	AreaDetails *Area         `bson:"areaDetails,omitempty" json:"areaDetails,omitempty"`
}

// Brand struct definition
type Brand struct {
	MongoID primitive.ObjectID `bson:"_id,omitempty" json:"mongoId,omitempty"`
	ID      int                `bson:"id" json:"id"`
	Name    string             `bson:"name" json:"name"`
	En      string             `bson:"en" json:"en"`
	Brewery primitive.ObjectID `bson:"brewery" json:"brewery"`
	BreweryDetails *Brewery           `bson:"breweryDetails,omitempty" json:"breweryDetails,omitempty"`
}