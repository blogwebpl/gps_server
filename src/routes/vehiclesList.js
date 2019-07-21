import FmLast from '../models/fmLast';
import UsersImei from '../models/usersImei';
import asyncForEach from '../functions/asyncForEach';
import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';

const getVehicles = asyncMiddleware(async(req, res) => {
	try {
		const usersImeis = await UsersImei.find({ user: req.user._id }).populate({ path: 'imei', select: 'imei -_id' });
		const vehicles = [];
		await asyncForEach(usersImeis, async(usersVehicle) => {
			console.log(usersVehicle);
			if (usersVehicle.live) {
				const liveData = await FmLast.findOne({ imei: usersVehicle.imei.imei });
				vehicles.push({
					name: usersVehicle.name,
					imei: liveData.imei,
					gps: liveData.gps,
					io: liveData.io,
					time: liveData.time,
					st: liveData.st,
					show: true
				});
			} else {
				vehicles.push({
					name: usersVehicle.name,
					imei: usersVehicle.imei.imei,
					show: false
				});
			}
		});
		res.send(vehicles);
		return;
	} catch (err) {
		/* ignore coverage */
		res.sendStatus(500);
	}
});

const router = new express.Router();
router.get('/', authenticate, getVehicles);
export default router;
