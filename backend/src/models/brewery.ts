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
	area: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Area',
	},
});

export const Brewery = mongoose.model('Brewery', brewerySchema);
