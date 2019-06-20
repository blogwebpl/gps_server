import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import app from '../index';
import supertest from 'supertest';

describe('routes/fields.js', () => {
	describe('GET /api/fields/:collectionName', () => {
		before(async() => {
			await initDb();
		});
		// TODO: test response body
		it('should return fields to user', (done) => {
			supertest(app)
				.get('/api/fields/users')
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
		it('should return fields to menu', (done) => {
			supertest(app)
				.get('/api/fields/menus')
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
