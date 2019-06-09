import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getCRUD from '../functions/getCRUD';
import getColumns from '../functions/getColumns';
import getModel from '../functions/getModel';
import getPopulate from '../functions/getPopulate';

export default (collectionName) => {
	const getDocuments = asyncMiddleware(async(req, res) => {
		// TODO: test can user read
		const columns = getColumns(req.user, collectionName);
		const select = columns.map((column) => (column.key)).join(' ');
		const populate = getPopulate(req.user, collectionName);
		const crud = getCRUD(req.user, collectionName);
		const data = await getModel(collectionName).find({}).select(select).populate(populate).lean();
		const response = {
			data,
			crud,
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
