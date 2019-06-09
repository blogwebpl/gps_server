import Menu from '../models/menu';
import MenuItem from '../models/menuItem';
import Permission from '../models/permission';
import Role from '../models/role';
import User from '../models/user';

export default (collectionName) => {
	switch (collectionName) {
		case 'menus':
			return Menu;
		case 'menuItems':
			return MenuItem;
		case 'permissions':
			return Permission;
		case 'roles':
			return Role;
		case 'users':
			return User;
	}
};
