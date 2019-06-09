import Menu from '../models/menu';
import MenuItem from '../models/menuItem';
import Permission from '../models/permission';
import Role from '../models/role';
import User from '../models/user';

export default (collectionName) => {
	switch (collectionName) {
		case 'menu':
			return Menu;
		case 'menuItem':
			return MenuItem;
		case 'permission':
			return Permission;
		case 'role':
			return Role;
		case 'users':
			return User;
	}
};
