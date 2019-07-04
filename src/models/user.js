import bcrypt from 'bcrypt';
import config from '../config';
import isEmail from 'validator/lib/isEmail';
import jwt from 'jsonwebtoken';
import mongoose from '../db/mongoose';

const env = process.env.NODE_ENV;
const jwtSecret = config[env].JWT_SECRET;

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		index: true,
		validate: {
			validator: (value) => isEmail(value),
			message: '{VALUE} is not valid email'
		}
	},
	password: {
		type: String,
		require: true
	},
	name: {
		type: String,
		require: true,
		trim: true,
		default: ''
	},
	selectedRole: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Role',
		required: false
	},
	roles: [ {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Role'
	} ],
	settings: {
		type: Object,
		default: {}
	},
	token: {
		type: String
	}
});

userSchema.pre('save', function(next) {
	const user = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			/* ignore coverage */
			if (err) {
				next(err);
			}
			bcrypt.hash(user.password, salt, (err, hash) => {
				if (!err) {
					user.password = hash;
					next();
				}
			});
		});
	} else {
		next();
	}
});

userSchema.pre('updateOne', function(next) {
	if (this.getUpdate() !== undefined) {
		const user = this;
		const password = this.getUpdate().password;
		/* ignore coverage */
		if (password !== undefined && password !== '') {
			bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					next(err);
				}
				bcrypt.hash(password, salt, (err, hash) => {
					if (err) {
						next(err);
					}
					user.findOneAndUpdate({}, { password: hash });
					next();
				});
			});
		} else {
			/* ignore coverage */
			next();
		}
	} else {
		/* ignore coverage */
		next();
	}
});

userSchema.methods.generateToken = function() {
	const user = this;
	const token = jwt.sign(
		{
			_id: user._id.toHexString(),
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
		},
		jwtSecret
	).toString();
	user.token = token;
	return user.save().then(() => (token));
};

userSchema.statics.findByCredentials = function(email, password) {
	const User = this;
	return User.findOne({ email })
		.then((user) => {
			if (!user) {
				return Promise.reject(new Error('user not found'));
			}
			return new Promise((resolve, reject) => {
				bcrypt.compare(password, user.password, (err, res) => {
					/* ignore coverage */
					if (err) {
						reject(new Error(err));
					}
					if (res) {
						resolve(user);
					} else {
						reject(new Error('incorrect password'));
					}
				});
			});
		});
};

userSchema.statics.findByToken = function(token) {
	const User = this;
	let decoded;
	try {
		decoded = jwt.verify(token, jwtSecret);
	} catch (err) {
		return Promise.reject(err);
	}
	return User.findOne({
		'_id': decoded._id,
		token
	}).populate({
		path: 'roles selectedRole',
		populate: {
			path: 'permissions'
		}
	});
};

userSchema.methods.removeToken = function(token) {
	const user = this;
	return user.updateOne({
		token: null
	});
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
