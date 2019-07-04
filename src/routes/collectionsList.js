import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import mongoose from '../db/mongoose';

const getCollectionsList = asyncMiddleware(async(req, res) => {
	const listOfCollections = [];
	mongoose.connection.db.collections((err, collections) => {
		if (err) {
			/* ignore coverage */
			res.sendStatus(500);
		}
		collections.forEach((data) => {
			listOfCollections.push(data.s.name);
		});
		res.send({
			collections: listOfCollections.sort()
		});
	});
});

const router = new express.Router();
router.get('/', authenticate, getCollectionsList);
export default router;
