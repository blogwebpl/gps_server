/**
 * @param {string} permission
 * @param {string} collectionName
 * @return {Array<object>} list of tabs
 */
export default (permission, collectionName) => {
	/* ignore coverage */
	const tabs = permission ? permission.tabs : [];
	try {
		return JSON.parse((JSON.stringify(tabs)));
	} catch (err) {
		console.log(err);
		/* ignore coverage */
		return [];
	}
};
