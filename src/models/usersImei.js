import mongoose from '../db/mongoose';

const usersImeiSchema = new mongoose.Schema({
	user: {
		require: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	imei: {
		type: String,
		require: true
	},
	label: {
		type: String,
		require: true
	}
});

const UsersImei = mongoose.models.UsersImei || mongoose.model('UsersImei', usersImeiSchema);

export default UsersImei;
