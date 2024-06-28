import express from 'express';
import { connectToDatabase } from './driver/driver';

import { DataLoaderFromAPIToMongoDB } from './services/data_loader';

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer(dbName: string) {
	try {
		const db = await connectToDatabase(dbName);
		console.log('Connected to database successfully');
		// Load data
		const loader = new DataLoaderFromAPIToMongoDB(
			db,
			'areas',
			'https://muro.sakenowa.com/sakenowa-data/api/areas'
		);
		// console.log(await loader.fetch_url())
		// await loader.insert_data('areas');

		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Failed to connect to the database', error);
		process.exit(1);
	}
}

startServer('sake');
