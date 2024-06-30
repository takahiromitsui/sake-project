import mongoose from 'mongoose';
import { Area } from '../models/area';
import { updatedAreas } from './areas';
import { connectionString } from '../db/connection';

async function loadArea() {
	try {
		await mongoose.connect(connectionString);
		await Area.insertMany(updatedAreas);
		mongoose.connection.close();
	} catch (e) {
		console.log(e);
	}
}
