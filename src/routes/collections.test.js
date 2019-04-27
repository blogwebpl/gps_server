import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import User from '../models/user';
import app from '../index';
import expect from 'expect';
import supertest from 'supertest';

describe('routes/collections.js', () => {
	describe('GET /api/users', () => {
		before(async() => {
			await initDb();
		});
		it('should return users', (done) => {
			supertest(app)
				.get('/api/users')
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
