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
	columns: {
		type: Array
	},
	fields: {
		type: Array
	},
	crud: {
		type: Number,
		default: 0
	},
	populate: {
		type: Object
	}
});

const Permission = mongoose.models.Permission || mongoose.model('Permission', permissionSchema);

export default Permission;
