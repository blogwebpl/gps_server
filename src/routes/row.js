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

const router = new express.Router();
router.get('/:collectionName', authenticate, getRow);
export default router;
