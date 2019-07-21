import mongoose from '../db/mongoose';

const menuItemSchema = new mongoose.Schema({
	icon: String,
	label: {
		type: Object
	},
	link: {
		type: String,
		required: false
	}
}, { collection: 'menuItems' });

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
