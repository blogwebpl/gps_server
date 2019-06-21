import _ from 'lodash';
import getPermissionForCollection from '../functions/getPermissionForCollection';

/**
 * @param {string} user
 * @param {string} collectionName
 * @return {Array<object>} list of columns
 */
export default (user, collectionName) => {
	const getRoleColumns = () => {
		const permission = getPermissionForCollection(user.selectedRole.permissions, collectionName);
		const columns = permission ? permission.columns : [];
		if (columns.length === 0) {
			return [];
		}
		try {
			return JSON.parse((JSON.stringify(columns)));
		} catch (err) {
			/* ignore coverage */
			return [];
		}
	};
	const getUserColumns = () => (user.settings && user.settings[ collectionName ] && user.settings[ collectionName ].columns);
	const compareColumns = (columns1, columns2) => {
		try {
			const length1 = Object.keys(columns1).length;
			const length2 = Object.keys(columns2).length;
			if (length1 !== length2) {
				return false;
			}
		} catch (err) {
			return false;
		}
		let result = true;

		columns1.forEach((k, index) => {
			const key = columns1[ index ].key;
			const i = _.findIndex(columns2, { key });
			if (i === -1) {
				/* ignore coverage */
				result = false;
			}
			if (index !== i) {
				/* ignore coverage */
				return false;
			}
		});
		return result;
	};
	const roleColumns = getRoleColumns();
	const userColumns = getUserColumns();
	if (compareColumns(roleColumns, userColumns) === false) {
		return roleColumns;
	}
	return userColumns;
};
