import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
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
	breweryId: {
		type: Number,
		required: true,
	},
});

const Brand = mongoose.model('Brand', brandSchema);
