import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from '../config';
const env = process.env.NODE_ENV;
const mongodbUri = config[env].MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.set('useFindAndModify', false);
mongoose.connect(mongodbUri, { useNewUrlParser: true, useCreateIndex: true });

export default mongoose;
