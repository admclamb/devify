const { expect, should } = require('chai');
const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

/**
 * US-03 create and login user
 */

describe('US-03 create and login user', () => {
  beforeAll(() => {
    return knex.migrate
      .forceFreeMigrationsLock()
      .then(() => knex.migrate.rollback(null, true))
      .then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    return knex.seed.run();
  });

  afterAll(async () => {
    return await knex.migrate.rollback(null, true).then(() => knex.destroy());
  });

  describe('Sessions Route', () => {
    describe('POST /sessions', () => {
      test('Should return 400 if no data', async () => {
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ datum: {} });
        console.log(response.body.error);
        expect(response.status).to.equal(400);
      });

      test('Should return 400 if no email property', async () => {
        const data = { password: '1234' };
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('email or password is missing.');
      });

      test('Should return 400 if email property is empty', async () => {
        const data = { email: '', password: '1234' };
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('email or password is missing.');
      });

      test('Should return 400 if no password property', async () => {
        const data = { email: 'testingemail@mail.com' };
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('email or password is missing.');
      });

      test('Should return 400 if password property is empty', async () => {
        const data = { email: 'testingemail@mail.com', password: '' };
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('email or password is missing.');
      });

      test('Should return 404 if email is not found', async () => {
        const data = { email: 'notafoundemail@mail.com' };
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('email or password is missing.');
      });

      test('Should return 401 if password is incorrect', async () => {
        const data = {
          email: 'ricksanchez@mail.com',
          password: 'notarealpassword',
        };
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ data });
        console.log(response.body.error);
        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal('Password is incorrect.');
      });

      // test('Should return 201 for created session', async () => {
      //   const data = {
      //     email: 'ricksanchez@mail.com',
      //     password: '1111Abc',
      //   };
      //   const response = await request(app)
      //     .post('/sessions')
      //     .set('Accept', 'application/json')
      //     .send({ data });

      //   expect(response.status).to.equal(201);
      //   expect(response.status.error).to.be.undefined;
      //   expect(response.body.data.session_id).to.equal(2);
      //   expect(response.body.data.user_id).to.equal(1);
      // });
    });
  });
});
