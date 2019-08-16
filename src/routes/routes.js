import FmData from '../models/fmData';
import asyncForEach from '../functions/asyncForEach';
import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';

const getRoute = asyncMiddleware(async(req, res) => {
	try {
		const imei = req.query.imei;
		const dateFrom = new Date(req.query.dateFrom);
		const dateTo = new Date(req.query.dateTo);
		if (dateFrom.toString === 'Invalid Date' || dateTo.toString === 'Invalid Date') {
			res.sendStatus(400);
			return;
		}
		const response = await FmData
			.find({ imei, time: { $gte: dateFrom, $lte: dateTo } })
			.select('-_id time gps io st')
			.sort({ time: 1 })
			.lean();
		res.send(response);
	} catch (err) {
		/* ignore coverage */
		res.sendStatus(500);
	}
});

const router = new express.Router();
router.get('/', authenticate, getRoute);
export default router;
