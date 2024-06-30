import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Area } from './models/area';

import { connectionString } from './db/connection';
import { Brewery } from './models/brewery';
import { Brand } from './models/brand';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/brands/:areaName', async (req: Request, res: Response) => {
	try {
		const { areaName } = req.params;
		const area = await Area.findOne({
			en: areaName,
		});
		if (!area) {
			//add logger
			return res.status(404).json({
				message: 'area not found',
			});
		} else {
			const breweries = await Brewery.find({ area: area });

			if (!breweries || breweries.length === 0) {
				// Add logger
				return res.status(404).json({
					message: 'Breweries not found for the given area',
				});
			}
			const brands = await Brand.find({ brewery: { $in: breweries } })
				.populate({
					path: 'brewery',
					populate: {
						path: 'area',
						model: 'Area'
					}
				})
				.exec();

			// Add logger
			res.status(200).json({
				brands: brands,
			});
		}
	} catch (error) {
		// add logger
		console.log(error);
		res.status(500).json({
			message: 'server error',
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
