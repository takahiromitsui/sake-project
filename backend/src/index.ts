import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { connectionString } from './db/connection';
import { getBrandsByAreaName } from './controllers/brands';
import ApiError from './helpers/api_error';

const app = express();
const PORT = process.env.PORT || 3000;

app.get(
	'/brands/:areaName',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { areaName } = req.params;
			const brands = await getBrandsByAreaName(areaName);
			if (brands instanceof ApiError) {
				return res.status(brands.status).json({ message: brands.message });
			}
			res.status(200).json({
				brands: brands,
			});
		} catch (error) {
			res.status(500).json({
				message: 'Internal server error',
			});
		}
	}
);

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
