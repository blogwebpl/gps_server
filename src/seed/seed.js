import Menu from '../models/menu';
import MenuItem from '../models/menuItem';
import { ObjectID } from 'mongodb';
import Permission from '../models/permission';
import Role from '../models/role';
import User from '../models/user';
import config from '../config';
import jwt from 'jsonwebtoken';
import mongoose from '../db/mongoose';

const env = process.env.NODE_ENV;
const jwtSecret = config[env].JWT_SECRET;

const menuItemOneId = new ObjectID();
const menuItemTwoId = new ObjectID();
const menuOneId = new ObjectID();
const menuTwoId = new ObjectID();
const permissionOneId = new ObjectID();
const permissionTwoId = new ObjectID();
const roleOneId = new ObjectID();
const roleTwoId = new ObjectID();
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();

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
	}
];

export const menus = [
	{
		_id: menuOneId,
		name: 'Admin menu',
		items: [
			{
				position: 1,
				item: menuItemOneId
			},
			{
				position: 2,
				item: menuItemTwoId
			}
		]
	},
	{
		_id: menuTwoId,
		name: 'User menu',
		items: [
			{
				position: 1,
				item: menuItemOneId
			},
			{
				position: 2,
				item: menuItemTwoId
			}
		]
	}
];

export const permissions = [
	{
		_id: permissionOneId,
		name: 'Users',
		collectionName: 'users',
		permissions: {}
	},
	{
		_id: permissionTwoId,
		name: 'Roles',
		collectionName: 'roles',
		permissions: {}
	}
];

export const roles = [
	{
		_id: roleOneId,
		name: 'Admin',
		menu: menuOneId,
		permissions: [permissionOneId]
	},
	{
		_id: roleTwoId,
		name: 'User',
		menu: menuTwoId,
		permissions: [permissionTwoId]
	}
];

const token = jwt.sign(
	{
		_id: userThreeId.toHexString(),
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
	},
	jwtSecret
).toString();

export const users = [
	{
		_id: userOneId,
		email: 'admin@admin.admin',
		password: 'admin',
		name: 'Administrator',
		selectedRole: roleOneId,
		roles: [roleOneId, roleTwoId]
	},
	{
		_id: userTwoId,
		email: 'user@user.user',
		password: 'user',
		name: 'User',
		selectedRole: roleTwoId,
		roles: [roleTwoId]
	},
	{
		_id: userThreeId,
		email: 'logged@user.user',
		password: 'logged',
		name: 'User',
		selectedRole: roleTwoId,
		roles: [roleTwoId],
		token
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
		await new Menu(menus[0]).save();
		await new Menu(menus[1]).save();
		await new Permission(permissions[0]).save();
		await new Permission(permissions[1]).save();
		await new Role(roles[0]).save();
		await new Role(roles[1]).save();
		await new User(users[0]).save();
		await new User(users[1]).save();
		await new User(users[2]).save();
	} catch (err) {
		/* ignore coverage */
		console.log(err);
	}
};
