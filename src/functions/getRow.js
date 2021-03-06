import { READ } from './crud';
import getModel from '../functions/getModel';
import getPermissionForCollection from '../functions/getPermissionForCollection';
/**
 * @param {string} user
 * @param {string} collectionName
 * @param {string} _id
 * @return {Object} [promise] row from collection
 */
export default async(user, collectionName, _id) => {
	const permission = getPermissionForCollection(user.selectedRole.permissions, collectionName);
	/* ignore coverage */
	const fields = (permission ? permission.fields.map((field) => (field.key)) : []).join(' ');
	const crud = permission.crud;
	if (!(crud & READ)) {
		/* ignore coverage */
		return {};
	}
	try {
		const row = await getModel(collectionName).findById(_id).select(fields).lean();
		/* ignore coverage */
		return {
			row
		};
	} catch (err) {
		/* ignore coverage */
		return {};
	}
};
