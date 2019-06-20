import _ from 'lodash';
/**
 * @param {Object} permissions
 * @param {string} collectionName
 * @return {Object} permission for collection
 */
export default (permissions, collectionName) => {
	const index = _.findIndex(permissions, { collectionName });
	if (index === -1) {
		return;
	}
	return permissions[ index ];
};
