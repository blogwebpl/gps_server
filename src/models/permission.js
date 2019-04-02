import mongoose from '../db/mongoose';

const permissionSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		minlength: 1
	},
	collectionName: {
		type: String,
		unique: false,
		minlength: 1
	},
	permissions: {
	}
});

const Permission = mongoose.models.Permission || mongoose.model('Permission', permissionSchema);

export default Permission;
