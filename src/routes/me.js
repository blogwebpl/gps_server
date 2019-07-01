import User from '../models/user';
import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getRoles from '../functions/getRoles';
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

const getProfile = asyncMiddleware(async(req, res) => {
	const userRoles = await User.findById(req.user).populate({
		path: 'roles selectedRole'
	});
	try {
		const roles = userRoles.roles.map((role) => ({
			value: role._id,
			label: role.name
		}));
		const selectedRole = {
			value: userRoles.selectedRole._id,
			label: userRoles.selectedRole.name
		};
		res.send({
			roles,
			selectedRole
		});
	} catch (err) {
		res.send(500);
	}
});

const postRole = asyncMiddleware(async(req, res) => {
	const userId = req.user._id;
	const roles = await getRoles(userId);
	const selectedRole = req.body.selectedRole;
	const index = roles.indexOf(selectedRole);
	if (index > -1) {
		await User.findOneAndUpdate({ _id: userId }, { $set: { selectedRole } });
		res.sendStatus(204);
	} else {
		res.sendStatus(401);
	}
});

const postPassword = asyncMiddleware(async(req, res) => {
	const password = req.body.password;
	if (!password) {
		res.send(400);
		return;
	}
	try {
		const userId = req.user._id;
		await User.updateOne({ _id: userId }, { password });
		res.sendStatus(204);
	} catch (err) {
		res.sendStatus(500);
	}
});

const router = new express.Router();

router.get('/profile', authenticate, getProfile);
router.post('/role', authenticate, postRole);
router.post('/password', authenticate, postPassword);
router.post('/login', postLogin);
router.post('/logout', authenticate, postLogout);

export default router;
