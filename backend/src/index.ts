import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import winston from 'winston';

import { connectionString } from './db/connection';
import { getBrandsByAreaName } from './controllers/brands';
import ApiError from './helpers/api_error';

const app = express();
const PORT = process.env.PORT || 3000;

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.cli(),
	transports: [new winston.transports.Console()],
});

app.get('/brands/:areaName', async (req: Request, res: Response) => {
	try {
		const { areaName } = req.params;
		const brands = await getBrandsByAreaName(areaName);
		if (brands instanceof ApiError) {
			logger.error(`${brands.status}: ${brands.message}`);
			return res.status(brands.status).json({ message: brands.message });
		}
		logger.info('200: Success');
		res.status(200).json({
			brands: brands,
		});
	} catch (error) {
		logger.info(`500: ${error}`);
		res.status(500).json({
			message: 'Internal server error',
		});
	}
});

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
