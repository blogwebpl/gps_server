import getPermissionForCollection from '../functions/getPermissionForCollection';

/**
 * @param {Object} user
 * @param {string} collectionName
 * @return {number} CRUD
 */
export default (user, collectionName) => {
	if (!collectionName) {
		return 0;
	}
	const permission = getPermissionForCollection(user.selectedRole.permissions, collectionName);
	/* ignore coverage */
	const crud = permission ? permission.crud : 0;
	try {
		return parseInt(crud, 10);
	} catch (err) {
		/* ignore coverage */
		return 0;
	}
};
