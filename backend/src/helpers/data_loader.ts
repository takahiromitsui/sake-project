import mongoose from 'mongoose';
import { Area } from '../models/area';
import { Brewery } from '../models/brewery';
import { Brand } from '../models/brand';
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

		for (let brewery of breweries) {
			const area = await Area.findOne({ id: brewery.areaId });
			if (area) {
				brewery.area = area;
			}
		}
		const chunkSize = 100;
		const chunks = [];
		for (let i = 0; i < breweries.length; i += chunkSize) {
			chunks.push(breweries.slice(i, i + chunkSize));
		}
		for (const chunk of chunks) {
			await Brewery.insertMany(chunk);
		}
		mongoose.connection.close();
	} catch (e) {
		console.log(e);
	}
}

async function loadBrand() {
	try {
		const response = await fetch(THIRD_PARTY_API + '/brands');
		const data = await response.json();
		const { brands } = data;
		await mongoose.connect(connectionString);
		for (let brand of brands) {
			const brewery = await Brewery.findOne({ id: brand.breweryId });
			if (brewery) {
				brand.brewery = brewery;
			}
		}
		const chunkSize = 100;
		const chunks = [];
		for (let i = 0; i < brands.length; i += chunkSize) {
			chunks.push(brands.slice(i, i + chunkSize));
		}
		for (const chunk of chunks) {
			await Brand.insertMany(chunk);
		}
		await mongoose.connection.close();
	} catch (e) {
		console.log(e);
	}
}

loadBrand();
