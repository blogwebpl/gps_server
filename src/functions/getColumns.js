import deepmerge from 'deepmerge';
export default (user, collectionName) => {
	const columns = [
		{
			key: 'name',
			label: 'Name',
			sortOrder: 1,
			sort: 'asc'
		},
		{
			key: 'email',
			label: 'E-mail',
			sortOrder: 2,
			sort: 'asc'
		}
	];
	const overwriteMerge = (destinationArray, sourceArray, options) => (sourceArray);
	const newColumns = user.settings && user.settings[ collectionName ] && user.settings[ collectionName ].columns;
	if (!newColumns) {
		return columns;
	}
	return deepmerge(columns, newColumns, { arrayMerge: overwriteMerge });
};
