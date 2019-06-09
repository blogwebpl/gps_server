import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getColumns from '../functions/getColumns';
import getModel from '../functions/getModel';

export default (collectionName) => {
	const getDocuments = asyncMiddleware(async(req, res) => {
		// TODO: get populate
		// TODO: get crud
		// TODO: test can user read
		const columns = getColumns(req.user, collectionName);
		const select = columns.map((column) => (column.key)).join(' ');
		const data = await getModel(collectionName).find({}).select(select).populate({ path: 'selectedRole', select: 'name' }).lean();
		const response = {
			data,
			crud: 15,
			columns
		};
		res.send(response);
	});
	const deleteDocuments = asyncMiddleware(async(req, res) => {
		res.sendStatus(204);
	});
	const router = new express.Router();
	router.get('/', authenticate, getDocuments);
	router.delete('/', authenticate, deleteDocuments);
	return router;
};
