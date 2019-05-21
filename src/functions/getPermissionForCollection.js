import _ from 'lodash';
export default (permissions, collectionName) => {
	const index = _.findIndex(permissions, { collectionName });
	if (index === -1) {
		return;
	}
	return permissions[ index ];
};
