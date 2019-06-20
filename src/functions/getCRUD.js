import getPermissionForCollection from '../functions/getPermissionForCollection';

/**
 * @param {string} user
 * @param {string} collectionName
 * @return {number} CRUD
 */
export default (user, collectionName) => {
	if (!collectionName) {
		return 0;
	}
	const permission = getPermissionForCollection(user.selectedRole.permissions, collectionName);
	const crud = permission ? permission.crud : 0;
	try {
		return parseInt(crud, 10);
	} catch (err) {
		/* ignore coverage */
		return 0;
	}
};
