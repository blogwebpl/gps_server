import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';

export default (collectionName) => {
	const getDocuments = asyncMiddleware(async(req, res) => {
		const data = {
			crud: 15,
			data: [
				{
					_id: 1,
					_selected: true,
					testString: 'Abc',
					testNumber: '123',
					testNumber2: '123'
				},
				{
					_id: 2,
					_selected: false,
					testString: 'Def',
					testNumber: '456',
					testNumber2: '456'
				},
				{
					_id: 3,
					_selected: false,
					testString: 'Ghi',
					testNumber: '789',
					testNumber2: '789'
				}
			],
			columns: [
				{
					id: 1,
					label: 'String'
				},
				{
					id: 2,
					label: 'Number'
				},
				{
					id: 3,
					label: 'Number 2'
				}
			]
		}
		res.send(data);
	});
	const router = new express.Router();
	// TO DO modify router.get('/', authenticate, getDocuments);
	router.get('/', getDocuments);
	return router;
}