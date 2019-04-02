import mongoose from '../db/mongoose';

const menuItemSchema = new mongoose.Schema({
	icon: String,
	label: {
		type: String,
		required: true,
		minlength: 1
	},
	link: {
		type: String,
		required: false
	}
});

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
