import mongoose from 'mongoose';

const filterSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	collectionName: {
		type: String,
		required: true
	},
	filters: []
});

const Filter = mongoose.models.Filter || mongoose.model('Filter', filterSchema);

export default Filter;
