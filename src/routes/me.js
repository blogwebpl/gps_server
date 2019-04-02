import User from '../models/user';
import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import { isEmail } from 'validator';
import pick from 'lodash/pick';

const postLogin = asyncMiddleware(async(req, res) => {
	const email = req.body.email;
	if (!isEmail(email)) {
		res.sendStatus(400);
		return;
	}
	const password = req.body.password;
	if (!password) {
		res.sendStatus(400);
		return;
	}
	let user;
	try {
		user = await User.findByCredentials(email, password);
	} catch (err) {
		res.sendStatus(401);
		return;
	}
	const token = await user.generateToken();
	user.token = token;
	res
		.header('x-auth', token)
		.send(pick(user, [ 'name', 'token', 'email', 'selectedRole' ]));
});

const postLogout = asyncMiddleware(async(req, res) => {
	const token = req.header('x-auth');
	let remove;
	try {
		remove = await req.user.removeToken(token);
		if (remove.ok === 1) {
			res.sendStatus(200);
		} else {
			/* ignore coverage */
			res.sendStatus(401);
		}
	} catch (err) {
		/* ignore coverage */
		res.sendStatus(400);
	}
});

const router = new express.Router();

router.post('/login', postLogin);
router.post('/logout', authenticate, postLogout);

export default router;
