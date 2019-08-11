import asyncForEach from '../functions/asyncForEach';
import getModel from '../functions/getModel';
/**
 * @param {Object} permission
 * @param {string} collectionName
 * @return {Array<object>} [promise] dictionaries
 */
export default async(permission, collectionName) => {
	/* ignore coverage */
	const ds = (permission ? permission.fields.map((field) => (field.collectionName ? [field.collectionName, field.key, field.collectionField] : false)) : []);
	const dictionaries = {};
	await asyncForEach(ds, async(d) => {
		if (d.length === 3) {
			const collectionName = d[0];
			const key = d[1];
			const fields = d[2];
			if (collectionName) {
				const data = await getModel(collectionName).find(/* TODO: filter data with user filter if avaiable */).select(fields).lean();
				const f = fields.split(' ');
				const dta = data.map((d) => {
					const l = f.map((field) => {
						return d[field];
					});
					return ({
						value: d._id,
						label: l.join(' ')
					});
				});
				dictionaries[key] = dta;
			}
		}
	});
	return dictionaries;
};
