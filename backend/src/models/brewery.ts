import mongoose from 'mongoose';

const brewerySchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	en: {
		type: String,
	},
	areaId: {
		type: Number,
		required: true,
	},
});

const Brewery = mongoose.model('Brewery', brewerySchema);
