import mongoose from 'mongoose';
const scheduleSchema = new mongoose.Schema({
	enabled: {
		type: Boolean
	},
	time: {
		type: String
	},
	job: {
		type: String
	}
});

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);

export default Schedule;
