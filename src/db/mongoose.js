import bluebird from 'bluebird';
import config from '../config';
import mongoose from 'mongoose';

const env = process.env.NODE_ENV;
const mongodbUri = config[env].MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.set('useFindAndModify', false);
if (!mongoose.connection.readyState) {
	mongoose.connect(mongodbUri, { useNewUrlParser: true, useCreateIndex: true });
}

export default mongoose;
