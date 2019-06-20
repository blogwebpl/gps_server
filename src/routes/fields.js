import asyncMiddleware from '../middleware/asyncMiddleware';
import authenticate from '../middleware/authenticate';
import express from 'express';
import getDictionaries from '../functions/getDictionaries';
import getFieldsFunction from '../functions/getFields';
import getPermissionForCollection from '../functions/getPermissionForCollection';
const getFields = asyncMiddleware(async(req, res) => {
	const collectionName = req.params.collectionName;
	const permission = getPermissionForCollection(req.user.selectedRole.permissions, collectionName);
	const dictionaries = await getDictionaries(permission, collectionName);
	const fields = getFieldsFunction(permission, collectionName);
	const response = {
		fields,
		dictionaries
	};
	res.send(response);
});

const router = new express.Router();
router.get('/:collectionName', authenticate, getFields);
export default router;
