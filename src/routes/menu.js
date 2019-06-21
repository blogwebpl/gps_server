import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';

const getMenu = asyncMiddleware(async(req, res) => {
	// const token = req.header('x-auth');
	const menu = [
		{
			id: 100,
			parent: null,
			position: 1,
			icon: 'settings',
			label: 'Settings',
			link: null
		},
		{
			id: 101,
			parent: 100,
			position: 1,
			icon: 'face',
			label: 'Users',
			link: '/users'
		},
		{
			id: 102,
			parent: 100,
			position: 2,
			icon: 'group_work',
			label: 'Roles',
			link: '/roles'
		},
		{
			id: 103,
			parent: 100,
			position: 3,
			icon: 'menu',
			label: 'Menus',
			link: '/menus'
		},
		{
			id: 104,
			parent: 100,
			position: 4,
			icon: 'more_vert',
			label: 'Menu items',
			link: '/menuItems'
		},
		{
			id: 105,
			parent: null,
			position: 5,
			icon: 'map',
			label: 'Map',
			link: 'map'
		}
	];
	res.send(menu);
});

const router = new express.Router();

router.get('/', authenticate, getMenu);

export default router;
