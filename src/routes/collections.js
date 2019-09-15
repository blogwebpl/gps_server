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
			/* ignore coverage */
			res.sendStatus(500);
			/* ignore coverage */
			return;
		}
		const crud = getCRUD(req.user, collectionName);
		if (!(crud & READ)) {
			/* ignore coverage */
			res.sendStatus(401);
			/* ignore coverage */
			return;
		}
		const columns = getColumns(req.user, collectionName);
		let data;
		try {
			data = await getCollection(req.user, collectionName);
		} catch (err) {
			/* ignore coverage */
			res.status(500).send(err.message);
			/* ignore coverage */
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
			/* ignore coverage */
			res.send(401);
			/* ignore coverage */
			return;
		}
		const ids = req.body.ids;
		try {
			await getModel(collectionName).deleteMany({ _id: { $in: ids } });
			res.sendStatus(204);
		} catch (err) {
			/* ignore coverage */
			res.status(500).send(err.message);
		}
	});
	const getFieldsList = asyncMiddleware(async(req, res) => {
		try {
			const fieldsList = [];
			getModel(collectionName).schema.eachPath((path) => {
				if (!path.startsWith('_')) {
					fieldsList.push(path);
				}
			});
			res.send({
				fields: fieldsList
			});
		} catch (err) {
			/* ignore coverage */
			res.sendStatus(500);
		}
	});

	const getFilters = asyncMiddleware(async(req, res) => {
		try {
			const user = req.user;
			const filters = (user.settings && user.settings[collectionName] && user.settings[collectionName].filters) || [];
			res.send({ filters });
		} catch (err) {
			res.sendStatus(500);
		}
	});

	const postAddFilter = asyncMiddleware(async(req, res) => {
		try {
			const user = req.user._id;
			const name = req.body.name;
			const filters = req.body.filters;
			console.log(user, name, collectionName, filters);
			res.sendStatus(200);
		} catch (err) {
			res.sendStatus(500);
		}
	});

	const router = new express.Router();
	router.get('/', authenticate, getDocuments);
	router.get('/fieldsList', authenticate, getFieldsList);
	router.get('/filters', authenticate, getFilters);
	router.post('/addFilters', authenticate, postAddFilter);
	router.delete('/', authenticate, deleteDocuments);
	return router;
};
