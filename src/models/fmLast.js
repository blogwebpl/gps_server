import mongoose from '../db/mongoose';

const fmLastSchema = new mongoose.Schema({
	imei: String,
	time: {
		type: Date
	},
	st: { type: Date, default: null },
	gps: {
		pos: {
			type: [Number],
			default: [0, 0],
			index: '2dsphere'
		},
		alt: {
			type: Number,
			min: -500,
			max: 5000
		},
		ang: {
			type: Number,
			min: 0,
			max: 359
		},
		sat: {
			type: Number,
			min: 0,
			max: 32
		},
		spd: {
			type: Number,
			min: 0,
			max: 2500
		}
	},
	io: [[Number]]
}, { collection: 'fmLast' });

fmLastSchema.index({ imei: 1 }, { unique: true });

const FmData = mongoose.model('fmLast', fmLastSchema);

export default FmData;
