import User from '../models/user';
import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getRowFunction from '../functions/getRow';
const getRow = asyncMiddleware(async(req, res) => {
	const collectionName = req.params.collectionName;
	const response = {
		row: await getRowFunction(req.user, collectionName, req.query._id)
	};
	res.send(response);
});
const postRow = asyncMiddleware(async(req, res) => {
	// const collectionName = req.params.collectionName;
	const row = req.body.row;
	const _id = row._id;
	try {
		if (_id) {
			await User.updateOne({ _id }, { ...row });
		} else {
			const data = new User({
				...row
			});
			await data.save();
		}
	} catch (err) {
		res.status(400).send(err.message);
		return;
	}
	console.log(row);
	res.sendStatus(200);
});

const router = new express.Router();
router.get('/:collectionName', authenticate, getRow);
router.post('/:collectionName', authenticate, postRow);
export default router;
