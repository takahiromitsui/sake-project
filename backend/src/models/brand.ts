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
	brewery: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Brewery',
	},
});

export const Brand = mongoose.model('Brand', brandSchema);
