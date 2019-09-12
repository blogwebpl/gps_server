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
			const liveData = await FmLast.findOne({ imei: usersVehicle.imei.imei });
			if (usersVehicle.live && liveData) {
				vehicles.push({
					name: usersVehicle.name,
					imei: liveData.imei,
					gps: liveData.gps,
					io: liveData.io,
					time: liveData.time,
					st: liveData.st,
					live: true,
					show: usersVehicle.show
				});
			} else {
				vehicles.push({
					name: usersVehicle.name,
					imei: usersVehicle.imei.imei,
					gps: {
						pos: [1, 1],
						alt: 0,
						ang: 0,
						sat: 0,
						spd: 0
					},
					st: '1900-01-01 00:00:00',
					time: '1900-01-01 00:00:00',
					io: [],
					live: false,
					show: usersVehicle.show
				});
			}
		});
		res.send(vehicles);
		return;
	} catch (err) {
		/* ignore coverage */
		console.log(err);
		res.sendStatus(500);
	}
});

const router = new express.Router();
router.get('/', authenticate, getVehicles);
export default router;
