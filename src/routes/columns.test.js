import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import app from '../index';
import supertest from 'supertest';

describe('routes/columns.js', () => {
	describe('GET /api/columns', () => {
		before(async() => {
			await initDb();
		});
		it('should return columns', (done) => {
			supertest(app)
				.post('/api/columns')
				.set('x-auth', users[2].token)
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
