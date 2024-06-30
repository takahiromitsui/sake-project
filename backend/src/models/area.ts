import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema({
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
		required: true,
	},
});

const Area = mongoose.model('Area', areaSchema);
