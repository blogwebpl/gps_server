import Menu from '../models/menu';

/**
 * @param {Object} user
 * @param {string} collectionName
 * @return {array} menu
 */
export default async(user) => {
	const menuId = user.selectedRole.menu;
	try {
		const doc = await Menu.findById(menuId)
			.lean()
			.populate({ path: 'items.item' });
		doc.items.forEach(({ item }, index) => {
			doc.items[index].icon = item.icon;
			doc.items[index].label = item.label;
			if (item.link) {
				doc.items[index].link = item.link;
			}
			delete doc.items[index]._id;
			doc.items[index]._id = item._id;
			delete doc.items[index].item;
		});
		return doc.items;
	} catch (err) {
		/* ignore coverage */
		return [];
	}
};
