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
					_selected: false,
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
					testString: 'Ire',
					testNumber: '289',
					testNumber2: '189'
				},
				{
					_id: 4,
					_selected: false,
					testString: 'Ire',
					testNumber: '289',
					testNumber2: '189'
				},
				{
					_id: 5,
					_selected: false,
					testString: 'Ire',
					testNumber: '189',
					testNumber2: '289'
				},
				{
					_id: 6,
					_selected: false,
					testString: 'Ree',
					testNumber: '789',
					testNumber2: '789'
				},
				{
					_id: 7,
					_selected: false,
					testString: 'Ghi',
					testNumber: '789',
					testNumber2: '789'
				},
				{
					_id: 8,
					_selected: false,
					testString: 'Zsd',
					testNumber: '739',
					testNumber2: '189'
				},
				{
					_id: 9,
					_selected: false,
					testString: 'Ghi',
					testNumber: '789',
					testNumber2: '789'
				},
				{
					_id: 10,
					_selected: false,
					testString: 'Ghi',
					testNumber: '789',
					testNumber2: '789'
				},
				{
					_id: 11,
					_selected: false,
					testString: 'Ghi',
					testNumber: '789',
					testNumber2: '789'
				}
			],
			columns: [
				{
					field: 'testString',
					label: 'String',
					sortOrder: 1,
					sort: 'asc'
				},
				{
					field: 'testNumber',
					label: 'Number',
					sortOrder: 2,
					sort: 'desc'
				},
				{
					field: 'testNumber2',
					label: 'Number 2',
					sortOrder: 3,
					sort: 'desc'
				}
			]
		};
		res.send(data);
	});
	const router = new express.Router();
	// TO DO modify router.get('/', authenticate, getDocuments);
	router.get('/', getDocuments);
	return router;
};
