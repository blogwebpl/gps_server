import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import app from '../index';
import supertest from 'supertest';

describe('routes/routes.js', () => {
	describe('GET /api/routes?imei=352094082752483&dateFrom=2019-06-01 05:00:00&dateTo=2019-08-10', () => {
		before(async() => {
			await initDb();
		});
		it('should return users menu', (done) => {
			supertest(app)
				.get('/api/routes?imei=352094082752483&dateFrom=2019-06-01 05:00:00&dateTo=2019-08-10')
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
