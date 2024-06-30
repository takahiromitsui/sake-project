import ApiError from '../helpers/api_error';
import { Area } from '../models/area';
import { Brand } from '../models/brand';
import { Brewery } from '../models/brewery';

export async function getBrandsByAreaName(areaName: string) {
	try {
		const area = await Area.findOne({
			en: areaName,
		});

		if (!area) {
			return new ApiError(404, 'Area not Found');
		} else {
			const breweries = await Brewery.find({ area: area });
			if (!breweries || breweries.length === 0) {
				return new ApiError(404, 'Breweries not found for the given area');
			}
			const brands = await Brand.find({ brewery: { $in: breweries } })
				.populate({
					path: 'brewery',
					populate: {
						path: 'area',
						model: 'Area',
					},
				})
				.exec();
			if (!brands || brands.length === 0) {
				return new ApiError(
					404,
					'No brands found for the breweries in the specified area'
				);
			}
			return brands;
		}
	} catch (error) {
		return new ApiError(500, 'Internal Server Error');
	}
}
