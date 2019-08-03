import Schedules from '../models/schedule';
import schedule from 'node-schedule';

function Scheduler() {
	this.schedules = [];
}

Scheduler.prototype.add = function() {
	for (let i = 0; i < this.schedules.length; i++) {
		schedule.cancelJob(this.schedules[i]);
	}
	this.schedules = [];
	Schedules.find({ enabled: true }).then((response) => {
		response.forEach((element, i) => {
			const time = element.time;
			const job = element.job;
			const scheduleName = `schedule${i}`;
			schedule.scheduleJob(scheduleName, time, (fireDate) => {
				switch (job) {
					case 'console_log_test':
						// console.log(`console_log_test ${new Date()}`);
						break;
					default:
				}
			});
			this.schedules.push(scheduleName);
		});
	});
};

const schedules = new Scheduler();

export default schedules;
