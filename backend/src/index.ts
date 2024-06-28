import express from 'express';
import { connectToDatabase } from './driver/driver';

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer(dbName: string) {
	try {
		await connectToDatabase(dbName);
		console.log('Connected to database successfully');

		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Failed to connect to the database', error);
		process.exit(1);
	}
}

startServer('sake');
