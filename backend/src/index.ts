import express from 'express';
import mongoose from 'mongoose';

import { connectionString } from './db/connection';

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
	try {
		await mongoose.connect(connectionString);
		console.log('Connected to database successfully');
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Failed to connect to the database', error);
		process.exit(1);
	}
}

startServer();
