import { Request, Response } from 'express';

import ApiError from '../helpers/api_error';
import { logger } from '../helpers/logger';
import { getBrandsByAreaName } from '../services/brands';

export const fetchBrandsByAreaName = async (req: Request, res: Response) => {
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
};
