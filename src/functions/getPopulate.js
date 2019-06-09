import getPermissionForCollection from '../functions/getPermissionForCollection';

export default (user, collectionName) => {
	const permission = getPermissionForCollection(user.selectedRole.permissions, collectionName);
	const populate = permission ? permission.populate : {};
	try {
		return JSON.parse((JSON.stringify(populate)));
	} catch (err) {
		/* ignore coverage */
		return {};
	}
};
