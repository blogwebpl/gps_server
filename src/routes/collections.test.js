import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import app from '../index';
import supertest from 'supertest';

describe('routes/collections.js', () => {
	describe('GET /api/users', () => {
		before(async() => {
			await initDb();
		});
		it('should return users', (done) => {
			supertest(app)
				.get('/api/users')
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
	describe('GET /api/menus', () => {
		before(async() => {
			await initDb();
		});
		it('should return users', (done) => {
			supertest(app)
				.get('/api/menus')
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
