// import User from './user';
import mongoose from '../db/mongoose';

const roleSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		minlength: 1
	},
	menu: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Menu'
	},
	permissions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Permission'
	}]
});

// roleSchema.pre('remove', function(next) {
// 	const role = this;
// 	User.update({}, { $pull: { 'roles': new mongoose.Types.ObjectId(role._id) } }, { multi: true });
// 	User.update({ selectedRole: new mongoose.Types.ObjectId(role._id) }, { $set: { selectedRole: null } }, { multi: true });
// 	next();
// });

const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

export default Role;
