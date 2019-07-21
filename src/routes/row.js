import _ from 'lodash';
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
	const language = req.body.language || 'en';
	try {
		if (row.label) {
			let oldLabel = {};
			if (_id) {
				const doc = await getModel(collectionName).findById(_id);
				oldLabel = doc.label;
			}
			const label = row.label;
			delete row.label;
			row.label = oldLabel;
			row.label[language] = label;
		}
		if (collectionName === 'permissions' && row.columns) {
			let oldColumns = {};
			if (_id) {
				const doc = await getModel('permissions').findById(_id);
				oldColumns = doc.columns;
			}
			row.columns.forEach((rowColumn, index) => {
				const label = rowColumn.label;
				const key = rowColumn.key;
				const oldRowColumn = _.find(oldColumns, { key }) || {};
				row.columns[index].label = {
					...oldRowColumn.label,
					[language]: label
				};
			});
		}
		if (collectionName === 'permissions' && row.fields) {
			let oldFields = {};
			if (_id) {
				const doc = await getModel('permissions').findById(_id);
				oldFields = doc.fields;
			}
			row.fields.forEach((rowField, index) => {
				const label = rowField.label;
				const key = rowField.key;
				const oldRowField = _.find(oldFields, { key }) || {};
				row.fields[index].label = {
					...oldRowField.label,
					[language]: label
				};
			});
		}
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
