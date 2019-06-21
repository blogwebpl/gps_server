import getPermissionForCollection from '../functions/getPermissionForCollection';

/**
 * @param {string} user
 * @param {string} collectionName
 * @return {Object} populate
 */
export default (user, collectionName) => {
	const permission = getPermissionForCollection(user.selectedRole.permissions, collectionName);
	/* ignore coverage */
	const populate = permission ? permission.populate : {};
	try {
		/* ignore coverage */
		if (Object.keys(populate).length === 0 && populate.constructor === Object) {
			return '';
		}
		/* ignore coverage */
		return JSON.parse((JSON.stringify(populate)));
	} catch (err) {
		/* ignore coverage */
		return '';
	}
};
