import mongoose from '../db/mongoose';

const usersImeiSchema = new mongoose.Schema({
	user: {
		require: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	imei: {
		require: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Imei'
	},
	name: {
		type: String,
		require: true
	},
	live: {
		type: Boolean,
		default: false
	}
});

const UsersImei = mongoose.models.UsersImei || mongoose.model('UsersImei', usersImeiSchema);

export default UsersImei;
