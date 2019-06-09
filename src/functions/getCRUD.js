import getPermissionForCollection from '../functions/getPermissionForCollection';

export default (user, collectionName) => {
	const permission = getPermissionForCollection(user.selectedRole.permissions, collectionName);
	const crud = permission ? permission.crud : {};
	try {
		return JSON.parse((JSON.stringify(crud)));
	} catch (err) {
		/* ignore coverage */
		return {};
	}
};
