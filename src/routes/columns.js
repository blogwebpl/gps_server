import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import deepmerge from 'deepmerge';
import express from 'express';
import getColumnsFunction from '../functions/getColumns';
import getModel from '../functions/getModel';

const getColumns = asyncMiddleware(async(req, res) => {
	const collectionName = req.params.collectionName;
	const response = {
		columns: getColumnsFunction(req.user, collectionName)
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
	if (Object.keys(currentSettings).length > 0) {
		const overwriteMerge = (destinationArray, sourceArray, options) => (sourceArray);
		newSettings = deepmerge(currentSettings, settings, { arrayMerge: overwriteMerge });
	} else {
		newSettings = settings;
	}
	await getModel(collectionName).updateOne({ _id: req.user._id }, { settings: newSettings });
	res.sendStatus(200);
});
const router = new express.Router();
router.get('/:collectionName', authenticate, getColumns);
router.post('/sort', authenticate, postColumnsSort);
export default router;
