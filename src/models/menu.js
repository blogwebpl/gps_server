import mongoose from '../db/mongoose';

const menuSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1
	},
	items: [
		{
			item: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'MenuItem',
				required: true
			},
			parent: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'MenuItem',
				required: false
			}
		}
	]
});

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);

export default Menu;
