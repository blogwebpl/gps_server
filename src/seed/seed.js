import 'idempotent-babel-polyfill';

import Menu from '../models/menu';
import MenuItem from '../models/menuItem';
import { ObjectID } from 'mongodb';
import Permission from '../models/permission';
import Role from '../models/role';
import User from '../models/user';
import config from '../config';
import jwt from 'jsonwebtoken';

const env = process.env.NODE_ENV;
const jwtSecret = config[env].JWT_SECRET;

const menuItemOneId = new ObjectID();
const menuItemTwoId = new ObjectID();
const menuItemThreeId = new ObjectID();
const menuItemFourId = new ObjectID();
const menuOneId = new ObjectID();
const menuTwoId = new ObjectID();
const permissionOneId = new ObjectID();
const permissionTwoId = new ObjectID();
const permissionThreeId = new ObjectID();
const roleOneId = new ObjectID();
const roleTwoId = new ObjectID();
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();
const userFourId = new ObjectID();
const userFiveId = new ObjectID();
const userSixId = new ObjectID();
const userSevenId = new ObjectID();

export const menuItems = [
	{
		_id: menuItemOneId,
		icon: 'account_circle',
		label: 'Users',
		link: '/users'
	},
	{
		_id: menuItemTwoId,
		icon: 'group_work',
		label: 'Roles',
		link: '/roles'
	},
	{
		_id: menuItemThreeId,
		icon: 'settings',
		label: 'Settings',
		link: ''
	},
	{
		_id: menuItemFourId,
		icon: 'map',
		label: 'Map',
		link: '/map'
	}
];

export const menus = [
	{
		_id: menuOneId,
		name: 'Admin menu',
		items: [
			{
				// settings
				item: menuItemThreeId
			},
			{
				// users
				item: menuItemOneId,
				parent: menuItemThreeId // settings
			},
			{
				// roles
				item: menuItemTwoId,
				parent: menuItemThreeId // settings
			},
			{
				// map
				item: menuItemFourId
			}
		]
	},
	{
		_id: menuTwoId,
		name: 'User menu',
		items: [
			{
				// users
				item: menuItemOneId
			},
			{
				// roles
				item: menuItemTwoId
			}
		]
	}
];

export const permissions = [
	{
		_id: permissionOneId,
		name: 'Users - full',
		collectionName: 'users',
		columns: [
			{
				key: 'name',
				label: 'Name',
				sortOrder: 2,
				sort: 'asc'
			},
			{
				key: 'email',
				label: 'E-mail',
				sortOrder: 1,
				sort: 'asc'
			},
			{
				key: 'selectedRole',
				label: 'Selected role',
				sortOrder: 3
			}
		],
		fields: [
			{
				key: 'name',
				label: 'Name',
				type: 'text',
				required: true
			},
			{
				key: 'email',
				label: 'E-mail',
				type: 'email',
				required: true
			}
		],
		crud: 15
	},
	{
		_id: permissionTwoId,
		name: 'Roles',
		collectionName: 'roles'
	},
	{
		_id: permissionThreeId,
		name: 'Menu - full',
		collectionName: 'menus',
		columns: [
			{
				'key': 'name',
				'label': 'Name',
				'sortOrder': 1,
				'sort': 'asc'
			}
		],
		fields: [
			{
				key: 'name',
				label: 'Name',
				type: 'text',
				required: true
			},
			{
				key: 'items',
				label: 'Items',
				type: 'multiselect',
				collectionName: 'menuItems',
				collectionField: 'label',
				required: false
			}
		],
		crud: 15
	}
];

export const roles = [
	{
		_id: roleOneId,
		name: 'Admin',
		menu: menuOneId,
		permissions: [permissionOneId, permissionTwoId, permissionThreeId]
	},
	{
		_id: roleTwoId,
		name: 'User',
		menu: menuTwoId,
		permissions: [permissionTwoId, permissionThreeId]
	}
];

const tokenOne = jwt.sign(
	{
		_id: userOneId.toHexString(),
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
	},
	jwtSecret
).toString();

const tokenThree = jwt.sign(
	{
		_id: userThreeId.toHexString(),
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
	},
	jwtSecret
).toString();

const tokenFour = jwt.sign(
	{
		_id: userFourId.toHexString(),
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
	},
	jwtSecret
).toString();

const tokenFive = jwt.sign(
	{
		_id: userFiveId.toHexString(),
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
	},
	jwtSecret
).toString();

const tokenSix = jwt.sign(
	{
		_id: userSixId.toHexString(),
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
	},
	jwtSecret
).toString();

export const users = [
	// admin user with token and settings
	{
		_id: userOneId,
		email: 'admin@admin.admin',
		password: 'admin',
		name: 'Administrator',
		selectedRole: roleOneId,
		roles: [roleOneId, roleTwoId],
		settings: {
			users: {
				columns: [
					{
						key: 'name',
						label: 'Name',
						sortOrder: 1,
						sort: 'asc'
					},
					{
						key: 'email',
						label: 'E-mail',
						sortOrder: 2,
						sort: 'asc'
					}
				]
			}
		},
		token: tokenOne
	},
	// user without token and without settings
	{
		_id: userTwoId,
		email: 'user@user.user',
		password: 'user',
		name: 'User',
		selectedRole: roleTwoId,
		roles: [roleTwoId]
	},
	// normal user with token and no settings
	{
		_id: userThreeId,
		email: 'logged@user.user',
		password: 'logged',
		name: 'User',
		// selectedRole: roleTwoId,
		roles: [roleTwoId],
		token: tokenThree
	},
	// user with 3 columns with keys like in role
	{
		_id: userFourId,
		email: 'logged2@user.user',
		password: 'logged',
		name: 'User ABC',
		selectedRole: roleOneId,
		roles: [roleOneId],
		settings: {
			users: {
				columns: [
					{
						key: 'name',
						label: 'Name',
						sortOrder: 3,
						sort: 'desc'
					},
					{
						key: 'email',
						label: 'E-mail',
						sortOrder: 1,
						sort: 'asc'
					},
					{
						key: 'selectedRole',
						label: 'Selected role',
						sortOrder: 2
					}
				]
			}
		},
		token: tokenFour
	},
	// user with 3 columns with keys not like in role
	{
		_id: userFiveId,
		email: 'asd@user.user',
		password: 'asd',
		name: 'User ASD',
		selectedRole: roleOneId,
		roles: [roleOneId],
		settings: {
			users: {
				columns: [
					{
						key: 'name',
						label: 'Name',
						sortOrder: 3,
						sort: 'asc'
					},
					{
						key: 'email',
						label: 'E-mail',
						sortOrder: 1,
						sort: 'asc'
					},
					{
						key: 'age',
						label: 'Age',
						sortOrder: 2
					}
				]
			}
		},
		token: tokenFive
	},
	// user with 3 columns with keys in different order
	{
		_id: userSixId,
		email: 'fgh@user.user',
		password: 'fgh',
		name: 'User FGH',
		selectedRole: roleTwoId,
		roles: [roleTwoId],
		settings: {
			users: {
				columns: [
					{
						key: 'email',
						label: 'E-mail',
						sortOrder: 3,
						sort: 'desc'
					},
					{
						key: 'name',
						label: 'Name',
						sortOrder: 1,
						sort: 'asc'
					},
					{
						key: 'selectedRole',
						label: 'Selected role',
						sortOrder: 2
					}
				]
			}
		},
		token: tokenSix
	},
	// for future use
	{
		_id: userSevenId,
		email: 'jkl@user.user',
		password: 'jkl',
		name: 'User JKL',
		selectedRole: roleTwoId,
		roles: [roleTwoId]
	}
];

export const initDb = async() => {
	try {
		await MenuItem.deleteMany();
		await Menu.deleteMany();
		await Permission.deleteMany();
		await Role.deleteMany();
		await User.deleteMany();
		await new MenuItem(menuItems[0]).save();
		await new MenuItem(menuItems[1]).save();
		await new MenuItem(menuItems[2]).save();
		await new MenuItem(menuItems[3]).save();
		await new Menu(menus[0]).save();
		await new Menu(menus[1]).save();
		await new Permission(permissions[0]).save();
		await new Permission(permissions[1]).save();
		await new Permission(permissions[2]).save();
		await new Role(roles[0]).save();
		await new Role(roles[1]).save();
		await new User(users[0]).save();
		await new User(users[1]).save();
		await new User(users[2]).save();
		await new User(users[3]).save();
		await new User(users[4]).save();
		await new User(users[5]).save();
		await new User(users[6]).save();
	} catch (err) {
		/* ignore coverage */
		console.log(err);
	}
};
