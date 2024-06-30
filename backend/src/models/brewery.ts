import mongoose from 'mongoose';

const brewerySchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	name: {
		type: String,
	},
	en: {
		type: String,
	},
	areaId: {
		type: Number,
		required: true,
	},
});

export const Brewery = mongoose.model('Brewery', brewerySchema);
