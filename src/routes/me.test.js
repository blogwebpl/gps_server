import 'idempotent-babel-polyfill';

import { initDb, users } from '../seed/seed';

import User from '../models/user';
import app from '../index';
import expect from 'expect';
import supertest from 'supertest';

describe('routes/me.js', () => {
	describe('POST /api/me/login', () => {
		beforeAll(async() => {
			await initDb();
		});
		test('should login user and return auth token', (done) => {
			supertest(app)
				.post('/api/me/login')
				.send({
					email: users[0].email,
					password: users[0].password
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
		test('should reject unknown email', (done) => {
			supertest(app)
				.post('/api/me/login')
				.send({
					email: 'aa@bb.cc',
					password: users[0].password
				})
				.expect(401)
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
		test('should reject unknown password', (done) => {
			supertest(app)
				.post('/api/me/login')
				.send({
					email: users[0].email,
					password: 'abc123'
				})
				.expect(401)
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
		test('should reject invalid email', (done) => {
			supertest(app)
				.post('/api/me/login')
				.send({
					email: 'aa@@aa',
					password: 'abc123'
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
		test('should reject empty password', (done) => {
			supertest(app)
				.post('/api/me/login')
				.send({
					email: users[0].email,
					password: ''
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
	describe('POST /api/me/logout', () => {
		beforeAll(async() => {
			await initDb();
		});
		test('should remove auth token on logout', (done) => {
			supertest(app)
				.post('/api/me/logout')
				.set('x-auth', users[2].token)
				.expect(200)
				.end(async(err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					const user = await User.findById(users[2]._id);
					expect(user.token).toBe(null);
					done();
				});
		});
		test('should return 401 when user not authenticated', (done) => {
			supertest(app)
				.post('/api/me/logout')
				.expect(401)
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
		test('should return 401 when invalid token', (done) => {
			supertest(app)
				.post('/api/me/logout')
				.set('x-auth', 'lalala')
				.expect(401)
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
		test('should return 401 when unknown token', (done) => {
			supertest(app)
				.post('/api/me/logout')
				.set('x-auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yzc1OTdkOTNhZjQ1OTI1Y2E3NzNjNTIiLCJleHAiOjE1ODI3NDY0NTcsImlhdCI6MTU1MTIxMDQ1N30.vAgU1TwvhCna2DX2iement_Dj9oUn2H-Kk66W2N_CUo')
				.expect(401)
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
