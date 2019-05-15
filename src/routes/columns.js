import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import columns from '../functions/getColumns';
import express from 'express';

const postColumns = asyncMiddleware(async(req, res) => {
	const response = {
		columns
	};
	res.send(response);
});
const router = new express.Router();
router.post('/', authenticate, postColumns);
export default router;
