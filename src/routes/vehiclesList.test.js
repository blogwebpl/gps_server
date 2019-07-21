import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import app from '../index';
import supertest from 'supertest';

describe('routes/vehiclesList.js', () => {
	describe('GET /api/vehiclesList', () => {
		before(async() => {
			await initDb();
		});
		it('should return usersVehicles', (done) => {
			supertest(app)
				.get('/api/vehiclesList')
				.set('x-auth', users[0].token)
				.expect(200)
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
	});
});
