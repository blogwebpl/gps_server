/**
 * @param {string} permission
 * @param {string} collectionName
 * @return {Array<object>} list of fields
 */
export default (permission, collectionName) => {
	/* ignore coverage */
	const fields = permission ? permission.fields : [];
	try {
		return JSON.parse((JSON.stringify(fields)));
	} catch (err) {
		console.log(err);
		/* ignore coverage */
		return [];
	}
};
