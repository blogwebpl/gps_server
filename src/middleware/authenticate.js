// eslint-disable-next-line no-unused-vars
import Permission from '../models/permission';
import Role from '../models/role';
import User from '../models/user';

const checkAccess = (req, res, next) => {
	const token = req.header('x-auth');
	User.findByToken(token).then(
		(user) => {
			if (!user) {
				res.sendStatus(401);
				return;
			}
			req.user = user;
			req.token = token;
			let selectedRole = user.selectedRole;
			if (!selectedRole) {
				selectedRole = user.roles[0]._id;
				req.user.selectedRole = selectedRole;
			}
			Role.findById(selectedRole).populate('permissions').then(
				(role) => {
					req.role = role;
					next();
				},
				/* ignore coverage */
				(err) => {
					next(err);
				}
			);
		},
		(err) => {
			res.statusMessage = err;
			res.sendStatus(401);
		}
	);
};

export default checkAccess;
