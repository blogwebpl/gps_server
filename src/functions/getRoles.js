import User from '../models/user';
/**
 * @param {string} userId
 * @return {Array} [promise] roles
 */
export default async(userId) => {
	try {
		const user = await User.findById(userId).lean();
		const roles = user.roles;
		return roles.map((role) => {
			return role.toString();
		});
	} catch (err) {
		/* ignore coverage */
		return [];
	}
};
