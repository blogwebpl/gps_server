import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import app from '../index';
import supertest from 'supertest';

describe('routes/columns.js', () => {
	describe('GET /api/columns/:collectionName', () => {
		before(async() => {
			await initDb();
		});
		it.only('should return columns to user with 2 collumns in settings', (done) => {
			supertest(app)
				.get('/api/columns/users')
				.set('x-auth', users[0].token)
				.expect(200)
				.expect('{"columns":[{"key":"name","label":"Name","sortOrder":1,"sort":"asc","type":"text"},{"key":"email","label":"E-mail","sortOrder":2,"sort":"asc","type":"text"},{"key":"selectedRole","label":"Selected role","sortOrder":4,"type":"text"},{"key":"dateFrom","label":"Date","sortOrder":3,"type":"date"}]}')
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
		it('should return columns (from user settings) for user with 3 columns in settings', (done) => {
			supertest(app)
				.get('/api/columns/users')
				.set('x-auth', users[3].token)
				.expect(200)
				.expect('{"columns":[{"key":"name","label":"Name","sortOrder":2,"sort":"asc","type":"text"},{"key":"email","label":"E-mail","sortOrder":1,"sort":"asc","type":"text"},{"key":"selectedRole","label":"Selected role","sortOrder":4,"type":"text"},{"key":"dateFrom","label":"Date","sortOrder":3,"type":"date"}]}')
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
		it('should return columns (from role) for user with 3 columns in settings but different order', (done) => {
			supertest(app)
				.get('/api/columns/users')
				.set('x-auth', users[5].token)
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
		it('should get fields list for user', (done) => {
			supertest(app)
				.get('/api/users/fieldsList')
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
