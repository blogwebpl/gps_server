import Imei from '../models/imei';
import UsersImei from '../models/usersImei';
import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';

const postShowVehicle = asyncMiddleware(async(req, res) => {
	const userId = req.user._id;
	const imei = req.body.imei;
	const show = req.body.show;
	try {
		const i = await Imei.findOne({ imei });
		await UsersImei.updateOne({ user: userId, imei: i._id }, { $set: { show } });
	} catch (err) {
		res.sendStatus(500);
		return;
	}
	res.sendStatus(200);
});

const router = new express.Router();

router.post('/', authenticate, postShowVehicle);

export default router;
