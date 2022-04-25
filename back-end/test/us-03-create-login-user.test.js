const { expect, should } = require('chai');
const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

/**
 * US-01 List posts and list comments for front end user stories
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

        expect(response.status).to.equal(400);
      });

      test('Should return 400 if no username property', async () => {
        const data = { password: '1234' };
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ data });

        expect(resposne.status).to.equal(400);
        expect(response.body.error).to.equal('username or password is missing');
      });

      test('Should return 400 if username property is empty', async () => {
        const data = { username: '', password: '1234' };
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('username or password is missing');
      });

      test('Should return 400 if no password property', async () => {
        const data = { username: 'testing_username' };
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ data });

        expect(resposne.status).to.equal(400);
        expect(response.body.error).to.equal('username or password is missing');
      });

      test('Should return 400 if password property is empty', async () => {
        const data = { username: 'testing_username', password: '' };
        const response = await request(app)
          .post('/sessions')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('username or password is missing');
      });
    });

    test('Should return 404 if username is not found', async () => {
      const { data = { username: }}
    })

    describe('DELETE /sessions', () => {});
  });
});
