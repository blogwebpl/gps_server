import User from '../models/user';
import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getColumns from '../functions/getColumns';

export default (collectionName) => {
	const getDocuments = asyncMiddleware(async(req, res) => {
		const data = await User.find({}).select('name email selectedRole').populate({ path: 'selectedRole', select: 'name' }).lean();
		const response = {
			data,
			crud: 15,
			columns: getColumns(req.user, collectionName)
		};
		res.send(response);
	});
	const router = new express.Router();
	router.get('/', authenticate, getDocuments);
	return router;
};
