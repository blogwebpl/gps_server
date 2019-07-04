import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getModel from '../functions/getModel';
import getRowFunction from '../functions/getRow';
const getRow = asyncMiddleware(async(req, res) => {
	const collectionName = req.params.collectionName;
	const response = {
		...await getRowFunction(req.user, collectionName, req.query._id)
	};
	res.send(response);
});
const postRow = asyncMiddleware(async(req, res) => {
	const collectionName = req.params.collectionName;
	const row = req.body.row;
	const _id = row._id;
	try {
		if (_id) {
			await getModel(collectionName).updateOne({ _id }, { ...row });
		} else {
			const Model = getModel(collectionName);
			const data = new Model({
				...row
			});
			await data.save();
		}
	} catch (err) {
		/* ignore coverage */
		res.status(400).send(err.message);
		/* ignore coverage */
		return;
	}
	res.sendStatus(200);
});

const router = new express.Router();
router.get('/:collectionName', authenticate, getRow);
router.post('/:collectionName', authenticate, postRow);
export default router;
