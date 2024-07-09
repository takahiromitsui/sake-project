package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Assuming Area struct definition
type Area struct {
	MongoID primitive.ObjectID `bson:"_id,omitempty" json:"mongoId,omitempty"`
	ID   int 								`bson:"id" json:"id"`
	Name string             `bson:"name" json:"name"`
	En   string             `bson:"en" json:"en"`
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

type Flavor struct {
	MongoID primitive.ObjectID `bson:"_id,omitempty" json:"mongoId,omitempty"`
	F1 float64 `bson:"f1" json:"f1"`
	F2 float64 `bson:"f2" json:"f2"`
	F3 float64 `bson:"f3" json:"f3"`
	F4 float64 `bson:"f4" json:"f4"`
	F5 float64 `bson:"f5" json:"f5"`
	F6 float64 `bson:"f6" json:"f6"`
	Brand primitive.ObjectID `bson:"brand" json:"brand"`
	BrandDetails *Brand `bson:"brandDetails,omitempty" json:"brandDetails,omitempty"`
}