import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import app from '../index';
import supertest from 'supertest';

describe('routes/menu.js', () => {
	describe('GET /api/menu', () => {
		before(async() => {
			await initDb();
		});
		it('should return users menu', (done) => {
			supertest(app)
				.get('/api/menu')
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
