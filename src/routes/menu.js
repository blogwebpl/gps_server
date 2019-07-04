import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getMenuFunction from '../functions/getMenu';

const getMenu = asyncMiddleware(async(req, res) => {
	const menu = await getMenuFunction(req.user);
	res.send(menu);
});

const router = new express.Router();

router.get('/', authenticate, getMenu);

export default router;
