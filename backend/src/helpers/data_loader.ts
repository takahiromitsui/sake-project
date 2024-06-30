import mongoose from 'mongoose';
import { Area } from '../models/area';
import { Brewery } from '../models/brewery';
import { updatedAreas } from './areas';
import { connectionString } from '../db/connection';

const THIRD_PARTY_API = ' https://muro.sakenowa.com/sakenowa-data/api';

async function loadArea() {
	try {
		await mongoose.connect(connectionString);
		await Area.insertMany(updatedAreas);
		mongoose.connection.close();
	} catch (e) {
		console.log(e);
	}
}

async function loadBrewery() {
	try {
		const response = await fetch(THIRD_PARTY_API + '/breweries');
		const data = await response.json();
		const { breweries } = data;
		await mongoose.connect(connectionString);
		await Brewery.insertMany(breweries);
		mongoose.connection.close();
	} catch (e) {
		console.log(e);
	}
}
