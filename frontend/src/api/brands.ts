import axios from 'axios';

type Area = {
	_id: string;
	id: number;
	name: string;
	en: string;
	__v: number;
};

type Brewery = {
	_id: string;
	id: number;
	name: string;
	area: Area;
	__v: number;
};

type Brand = {
	_id: string;
	id: number;
	name: string;
	brewery: Brewery;
	__v: number;
};

export async function getBrands(place: string) {
	const res = await axios.get<{ brands: Brand[] }>(
		`http://localhost:8000/brands/${place}`
	);
	return res.data.brands;
}
