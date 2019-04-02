import User from '../models/user';
import Role from '../models/role';

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
			const selectedRole = user.selectedRole;
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
