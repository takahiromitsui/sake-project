import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
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
	breweryId: {
		type: Number,
		required: true,
	},
});

export const Brand = mongoose.model('Brand', brandSchema);
