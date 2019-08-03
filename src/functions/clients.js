import Imei from '../models/imei';
import UsersImei from '../models/usersImei';

function Client() {
	this.clients = [];
}

Client.prototype.add = function(socket) {
	// console.log('dodaje klienta');
	this.clients.push(socket);
};

Client.prototype.len = function() {
	return this.clients.length;
};

Client.prototype.remove = function(socket) {
	// console.log('usuwam klienta');
	const i = this.clients.indexOf(socket);
	this.clients.splice(i, 1);
};

Client.prototype.emit = async function({
	type,
	data
}) {
	if (type === 'point') {
		let imei;
		try {
			imei = await Imei.findOne({ imei: data.imei });
		// eslint-disable-next-line no-empty
		} catch (_err) {
		}
		let usersImei;
		try {
			usersImei = await UsersImei.find({ imei: imei._id }).select('user');
		// eslint-disable-next-line no-empty
		} catch (_err) {
		}
		if (!usersImei) {
			return;
		}
		const usersID = usersImei.map((user) => (user.user.toString()));
		this.clients.forEach((socket) => {
			const decodedToken = socket.decoded_token;
			if (usersID.includes(decodedToken._id)) {
				socket.emit('point', data);
			}
		});
	}
};

const clients = new Client();

export default clients;
