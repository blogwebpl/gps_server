import Menu from '../models/menu';
import MenuItem from '../models/menuItem';
import Permission from '../models/permission';
import Role from '../models/role';
import User from '../models/user';

/**
 * @param {string} collectionName
 * @return model
 */
export default (collectionName) => {
	switch (collectionName) {
		case 'menus':
			return Menu;
		case 'menuItems':
			return MenuItem;
		case 'permissions':
			/* ignore coverage */
			return Permission;
		case 'roles':
			/* ignore coverage */
			return Role;
		case 'users':
			return User;
	}
};
