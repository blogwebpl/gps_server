import mongoose from '../db/mongoose';

const fixedAssetSchema = new mongoose.Schema({
	inventoryNumber: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true,
		default: ''
	},
	quatraInfo: {
		type: String,
		required: false
	},
	fromDate: {
		type: Date,
		required: true
	},
	toDate: {
		type: Date,
		required: false
	},
	organizationUnit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'OrganizationUnit',
		required: false
	},
	employees: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Employee',
		required: false
	}],
	parts: [{
		name: String,
		type: String, // TODO: ref to types
		nfcSerial: String,
		nfcText: String // ex. K 4-1160-491 001/002
	}]
}, { collection: 'fixedAssets' });

fixedAssetSchema.index({ inventoryNumber: 1 }, { unique: true });

const FixedAsset = mongoose.models.FixedAsset || mongoose.model('FixedAsset', fixedAssetSchema);

export default FixedAsset;
