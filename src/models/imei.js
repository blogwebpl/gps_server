import mongoose from '../db/mongoose';

const imeiSchema = new mongoose.Schema({
	imei: {
		type: String,
		required: true
	},
	allow: {
		type: Boolean,
		required: true,
		default: false
	},
	name: {
		type: String,
		required: false,
		default: ''
	}
});

imeiSchema.index({ imei: 1 }, { unique: true });

const Imei = mongoose.models.Imei || mongoose.model('Imei', imeiSchema);

export default Imei;
