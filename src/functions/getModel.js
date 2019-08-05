import FmData from '../models/fmData';
import FmLast from '../models/fmLast';
import Imei from '../models/imei';
import Menu from '../models/menu';
import MenuItem from '../models/menuItem';
import Permission from '../models/permission';
import Role from '../models/role';
import Schedule from '../models/schedule';
import User from '../models/user';
import UsersImei from '../models/usersImei';
/**
 * @param {string} collectionName
 * @return model
 */
export default (collectionName) => {
	switch (collectionName) {
		case 'fmData':
			return FmData;
		case 'fmLast':
			return FmLast;
		case 'imeis':
			return Imei;
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
		case 'schedules':
			/* ignore coverage */
			return Schedule;
		case 'users':
			return User;
		case 'usersImeis':
			return UsersImei;
	}
};
