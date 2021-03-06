import 'idempotent-babel-polyfill';
import './db/mongoose';

import FmData from './models/fmData';
import FmLast from './models/fmLast';
import FmServer from 'fm';
import Imei from './models/imei';
import bodyParser from 'body-parser';
import bodyParserError from 'bodyparser-json-error';
import clients from './functions/clients';
import collections from './routes/collections';
import collectionsList from './routes/collectionsList';
import columns from './routes/columns';
import config from './config';
import express from 'express';
import fields from './routes/fields';
import fs from 'fs';
import headers from './middleware/headers';
import http from 'http';
import https from 'spdy';
import me from './routes/me';
import menu from './routes/menu';
import path from 'path';
import routes from './routes/routes';
import row from './routes/row';
import schedules from './functions/scheduler';
import showVehicle from './routes/showVehicle';
import socketIO from 'socket.io';
import socketioJwt from 'socketio-jwt';
import updatePosition from './functions/updatePosition';
import vehiclesList from './routes/vehiclesList';

// import morgan from 'morgan';

const env = process.env.NODE_ENV;
const port = parseInt(config[env].PORT);

const app = express();
// app.use(morgan('combined'));
/* ignore coverage */
const httpsOptions = (config[env].HTTPS === true) ? {
	ca: fs.readFileSync(path.join(config[env].CA_PATH, config[env].CA_FILE)),
	cert: fs.readFileSync(path.join(config[env].CERT_PATH, config[env].CERT_FILE)),
	key: fs.readFileSync(path.join(config[env].KEY_PATH, config[env].KEY_FILE))
} : null;
/* ignore coverage */
const server = (config[env].HTTPS === true) ? https.createServer(httpsOptions, app) : http.createServer(app);
headers(app);
app.use(bodyParser.json());
app.use(bodyParserError.beautify({ status: 500 }));
app.use('/', express.static(path.join(__dirname, '..', '..', 'client', 'build')));
app.use('/api/me', me);
app.use('/api/columns', columns);
app.use('/api/fields', fields);
app.use('/api/row', row);
app.use('/api/menu', menu);
app.use('/api/showVehicle', showVehicle);
app.use('/api/routes', routes);
app.use('/api/collectionsList', collectionsList);
app.use('/api/vehiclesList', vehiclesList);
const listOfCollections = ['users', 'roles', 'imeis', 'menus', 'menuItems', 'permissions', 'usersImeis', 'schedules'];
listOfCollections.forEach((collection) => {
	app.use(`/api/${collection}`, collections(collection));
});
app.get('*', (req, res) => {
	res.sendFile(
		path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
	);
});

const io = socketIO(server, { serveClient: false });

io.use(socketioJwt.authorize({
	secret: config[env].JWT_SECRET,
	handshake: true
}));

io.on('connection', (socket) => {
	// console.log('on connection');
	clients.add(socket);
	socket.on('disconnect', () => {
		clients.remove(socket);
	});
});

server.on('error', (err) => {
	switch (err.code) {
		case 'EADDRINUSE':
			console.log('Addres in use.');
			process.exit();
			return;
		default: console.log('Unknown error.');
	}
});

/* ignore coverage */
if (env !== 'test') {
	server.listen(port, '0.0.0.0', () => {
		console.log(`Server [${env}] listening on port ${port}`);
		const fmServer = new FmServer({
			fmPort: 5005,
			Imei,
			FmData,
			FmLast,
			updatePosition
		});
		fmServer.start();
		schedules.add();
	});
}
export default app;
