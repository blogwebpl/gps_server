import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import app from '../index';
import supertest from 'supertest';

describe('routes/row.js', () => {
	describe('GET /api/row/:collectionName', () => {
		before(async() => {
			await initDb();
		});
		// TODO: test response body
		it('should return row for user collection', (done) => {
			supertest(app)
				.get('/api/row/users')
				.query({ _id: users[0]._id })
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
		it('should return row for menu collection', (done) => {
			supertest(app)
				.get('/api/row/menus')
				.query({ _id: users[0]._id })
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
