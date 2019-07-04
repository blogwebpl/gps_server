import 'idempotent-babel-polyfill';

import { initDb, roles, users } from '../seed/seed';

import User from '../models/user';
import app from '../index';
import expect from 'expect';
import supertest from 'supertest';

describe('routes/me.js', () => {
	describe('POST /api/me/login', () => {
		beforeEach(async() => {
			await initDb();
		});
		it('should login user and return auth token', (done) => {
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
		it('should get profile', (done) => {
			supertest(app)
				.get('/api/me/profile')
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
		it('should get profile for user without selected role', (done) => {
			supertest(app)
				.get('/api/me/profile')
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
		it('should post role', (done) => {
			supertest(app)
				.post('/api/me/role')
				.set('x-auth', users[ 0 ].token)
				.send({
					selectedRole: roles[ 0 ]._id
				})
				.expect(204)
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
		it('should reject unknown email', (done) => {
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
		it('should post password', (done) => {
			supertest(app)
				.post('/api/me/password')
				.set('x-auth', users[ 0 ].token)
				.send({
					password: 'abc'
				})
				.expect(204)
				.end((err) => {
					if (err) {
						done(new Error(err.message));
						return;
					}
					done();
				});
		});
		it('should reject empty password', (done) => {
			supertest(app)
				.post('/api/me/password')
				.set('x-auth', users[ 0 ].token)
				.send({
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
		it('should reject unknown password', (done) => {
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
		it('should reject invalid email', (done) => {
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
		it('should reject empty password', (done) => {
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
		before(async() => {
			await initDb();
		});
		it('should remove auth token on logout', (done) => {
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
		it('should return 401 when user not authenticated', (done) => {
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
		it('should return 401 when invalid token', (done) => {
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
		it('should return 401 when unknown token', (done) => {
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
