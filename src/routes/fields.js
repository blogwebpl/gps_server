import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getFieldsFunction from '../functions/getFields';
const getFields = asyncMiddleware(async(req, res) => {
	const collectionName = req.params.collectionName;
	const response = {
		fields: getFieldsFunction(req.user, collectionName)
	};
	res.send(response);
});

const router = new express.Router();
router.get('/:collectionName', authenticate, getFields);
export default router;
