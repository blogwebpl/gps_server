import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import app from '../index';
import supertest from 'supertest';

describe('routes/columns.js', () => {
	describe('GET /api/columns/:collectionName', () => {
		before(async() => {
			await initDb();
		});
		it('should return columns', (done) => {
			supertest(app)
				.get('/api/columns/users')
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
	describe('POST /api/columns/sort', () => {
		before(async() => {
			await initDb();
		});
		it('should save columns sort settings when user already have settings', (done) => {
			supertest(app)
				.post('/api/columns/sort')
				.set('x-auth', users[0].token)
				.send({
					collectionName: 'users',
					columns: [
						{
							key: 'name',
							label: 'Name',
							sortOrder: 1,
							sort: 'asc'
						},
						{
							key: 'email',
							label: 'E-mail',
							sortOrder: 2,
							sort: 'asc'
						}
					]
				})
				.expect(200)
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
		it('should save columns sort settings when user not have settings', (done) => {
			supertest(app)
				.post('/api/columns/sort')
				.set('x-auth', users[2].token)
				.send({
					collectionName: 'users',
					columns: [
						{
							key: 'name',
							label: 'Name',
							sortOrder: 1,
							sort: 'asc'
						},
						{
							key: 'email',
							label: 'E-mail',
							sortOrder: 2,
							sort: 'asc'
						}
					]
				})
				.expect(200)
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
		it('should not save columns sort settings when bad data', (done) => {
			supertest(app)
				.post('/api/columns/sort')
				.set('x-auth', users[0].token)
				.send({
					collectionName: 'users'
				})
				.expect(400)
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
