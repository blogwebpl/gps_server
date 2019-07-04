import 'idempotent-babel-polyfill';
import './db/mongoose';

import bodyParser from 'body-parser';
import bodyParserError from 'bodyparser-json-error';
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
import row from './routes/row';

const env = process.env.NODE_ENV;
const port = parseInt(config[env].PORT);

const app = express();
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
app.use('/api/collectionsList', collectionsList);
app.use('/api/fieldsList', collectionsList);
const listOfCollections = [ 'users', 'roles', 'menus', 'menuItems', 'permissions' ];
listOfCollections.forEach((collection) => {
	app.use(`/api/${collection}`, collections(collection));
});

/* ignore coverage */
if (env !== 'test') {
	server.listen(port, '0.0.0.0', () => {
		console.log(`Server [${env}] listening on port ${port}`);
	});
}
export default app;
