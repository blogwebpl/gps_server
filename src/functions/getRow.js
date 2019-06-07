import { READ } from './crud';
import User from '../models/user';
import getPermissionForCollection from '../functions/getPermissionForCollection';
export default async(user, collectionName, _id) => {
	const permission = getPermissionForCollection(user.selectedRole.permissions, collectionName);
	const fields = (permission ? permission.fields.map((field) => (field.key)) : []).join(' ');
	const crud = permission.crud;
	if (!(crud & READ)) {
		return {};
	}
	try {
		const row = await User.findById(_id).select(fields).lean();
		return row;
	} catch (err) {
		/* ignore coverage */
		return {};
	}
};
