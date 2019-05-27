import getPermissionForCollection from '../functions/getPermissionForCollection';

export default (user, collectionName) => {
	const permission = getPermissionForCollection(user.selectedRole.permissions, collectionName);
	const fields = permission ? permission.fields : [];
	try {
		return JSON.parse((JSON.stringify(fields)));
	} catch (err) {
		/* ignore coverage */
		return [];
	}
};
