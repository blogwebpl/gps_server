import User from '../models/user';
import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import columns from '../functions/getColumns';
import express from 'express';

export default (collectionName) => {
	const getDocuments = asyncMiddleware(async(req, res) => {
		const data = await User.find({}).select('name email').lean();
		const response = {
			data,
			crud: 15,
			columns
		};
		res.send(response);
	});
	const router = new express.Router();
	router.get('/', authenticate, getDocuments);
	return router;
};
