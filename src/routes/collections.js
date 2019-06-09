import { READ } from '../functions/crud';
import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getCRUD from '../functions/getCRUD';
import getColumns from '../functions/getColumns';
import getModel from '../functions/getModel';
import getPopulate from '../functions/getPopulate';

export default (collectionName) => {
	const getDocuments = asyncMiddleware(async(req, res) => {
		const crud = getCRUD(req.user, collectionName);
		if (!(crud & READ)) {
			res.send(401);
			return;
		}
		const columns = getColumns(req.user, collectionName);
		const select = columns.map((column) => (column.key)).join(' ');
		const populate = getPopulate(req.user, collectionName);
		let data = [];
		try {
			data = await getModel(collectionName).find().select(select).populate(populate).lean();
		} catch (err) {
			res.status(500).send(err.message);
			return;
		}
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
