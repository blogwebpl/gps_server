import Users from '../models/user';
import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import deepmerge from 'deepmerge';
import express from 'express';
import getColumns from '../functions/getColumns';

const postColumns = asyncMiddleware(async(req, res) => {
	const collectionName = req.body.collectionName;
	const response = {
		columns: getColumns(req.user, collectionName)
	};
	res.send(response);
});
const postColumnsSort = asyncMiddleware(async(req, res) => {
	const collectionName = req.body.collectionName;
	const columns = req.body.columns;
	if (!collectionName || !columns) {
		res.sendStatus(400);
		return;
	}
	let newSettings;
	const settings = {
		[collectionName]: {
			columns
		}
	};
	const currentSettings = req.user.settings;
	if (currentSettings) {
		const overwriteMerge = (destinationArray, sourceArray, options) => (sourceArray);
		newSettings = deepmerge(currentSettings, settings, { arrayMerge: overwriteMerge });
	} else {
		newSettings = settings;
	}
	await Users.updateOne({ _id: req.user._id }, { settings: newSettings });
	res.sendStatus(200);
});
const router = new express.Router();
router.post('/', authenticate, postColumns);
router.post('/sort', authenticate, postColumnsSort);
export default router;
