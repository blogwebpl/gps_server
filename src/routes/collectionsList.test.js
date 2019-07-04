import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import app from '../index';
import supertest from 'supertest';

describe('routes/collectionsList.js', () => {
	describe('GET /api/collectionsList', () => {
		before(async() => {
			await initDb();
		});
		it('should return collectionsList', (done) => {
			supertest(app)
				.get('/api/collectionsList')
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
