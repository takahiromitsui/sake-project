import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { connectionString } from './db/connection';
import { router as BrandRoutes } from './routes/brands';
import { logger } from './helpers/logger';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use('/brands', BrandRoutes);

async function startServer() {
	try {
		await mongoose.connect(connectionString);
		logger.info('Connected to database successfully');
		app.listen(PORT, () => {
			logger.info(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		logger.info('Failed to connect to the database', error);
		process.exit(1);
	}
}

startServer();
