import { DELETE, READ } from '../functions/crud';

import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getCRUD from '../functions/getCRUD';
import getCollection from '../functions/getCollection';
import getColumns from '../functions/getColumns';
import getModel from '../functions/getModel';

export default (collectionName) => {
	const getDocuments = asyncMiddleware(async(req, res) => {
		if (!collectionName) {
			res.send(500);
			return;
		}
		const crud = getCRUD(req.user, collectionName);
		console.log(crud);
		if (!(crud & READ)) {
			res.send(401);
			return;
		}
		const columns = getColumns(req.user, collectionName);
		let data;
		try {
			data = await getCollection(req.user, collectionName);
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
		const crud = getCRUD(req.user, collectionName);
		if (!(crud & DELETE)) {
			res.send(401);
			return;
		}
		const ids = req.body.ids;
		try {
			await getModel(collectionName).deleteMany({ _id: { $in: ids } });
			res.sendStatus(204);
		} catch (err) {
			res.status(500).send(err.message);
		}
	});
	const router = new express.Router();
	router.get('/', authenticate, getDocuments);
	router.delete('/', authenticate, deleteDocuments);
	return router;
};
