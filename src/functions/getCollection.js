import { READ } from './crud';
import getColumns from '../functions/getColumns';
import getModel from '../functions/getModel';
import getPermissionForCollection from '../functions/getPermissionForCollection';
import getPopulate from '../functions/getPopulate';

/**
 * @param {string} user
 * @param {string} collectionName
 * @return {Array<object>} [promise] documents
 */
export default async(user, collectionName) => {
	const permission = getPermissionForCollection(user.selectedRole.permissions, collectionName);
	const crud = permission.crud;
	if (!(crud & READ)) {
		/* ignore coverage */
		return [];
	}
	try {
		const columns = getColumns(user, collectionName);
		const select = columns.map((column) => (column.key)).join(' ');
		const populate = getPopulate(user, collectionName);
		const data = await getModel(collectionName).find().select(select).populate(populate).lean();
		return data;
	} catch (err) {
		/* ignore coverage */
		return [];
	}
};
