const { expect, should } = require('chai');
const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

/**
 * US-01 List posts and list comments for front end user stories
 */

describe('US-02 create post', () => {
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

  describe('Post Route', () => {
    describe('POST /posts', () => {
      test('Should return 400 if data is missing', async () => {
        const response = await request(app)
          .post('/posts')
          .set('Accept', 'application/json')
          .send({ datum: {} });

        expect(response.status).to.equal(400);
      });

      test('Should return 400 if post_header is missing', async () => {
        const data = {
          post_body: 'Another test 111',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
          hashtags_array: ['JavaScript', 'Java', 'Mocha', 'Chai'],
          user_id: 1,
        };
        const response = await request(app)
          .post('/posts')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.body.error).to.contain('post_header');
        expect(response.status).to.equal(400);
      });

      test('Should return 400 if post_body is missing', async () => {
        const data = {
          post_header: 'Test',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
          hashtags_array: ['JavaScript', 'Java', 'Mocha', 'Chai'],
          user_id: 1,
        };
        const response = await request(app)
          .post('/posts')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.body.error).to.contain('post_body');
        expect(response.status).to.equal(400);
      });

      test('Should return 400 if user_id is missing', async () => {
        const data = {
          post_header: 'Test',
          post_body: 'Another test 111',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
          hashtags_array: ['JavaScript', 'Java', 'Mocha', 'Chai'],
        };
        const response = await request(app)
          .post('/posts')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.body.error).to.contain('user_id');
        expect(response.status).to.equal(400);
      });

      test('Should return 400 if user_id is not a number', async () => {
        const data = {
          post_header: 'Test',
          post_body: 'Another test 111',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
          hashtags_array: ['JavaScript', 'Java', 'Mocha', 'Chai'],
          user_id: '1',
        };
        const response = await request(app)
          .post('/posts')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.body.error).to.equal('user_id must be a number');
        expect(response.status).to.equal(400);
      });

      test('Should return 400 if user_id is empty', async () => {
        const data = {
          post_header: 'Test',
          post_body: 'Another test 111',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
          hashtags_array: ['JavaScript', 'Java', 'Mocha', 'Chai'],
          user_id: '',
        };
        const response = await request(app)
          .post('/posts')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.body.error).to.contain('user_id');
        expect(response.status).to.equal(400);
      });

      test('Should return 400 if user_id is null', async () => {
        const data = {
          post_header: 'Test',
          post_body: 'Another test 111',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
          hashtags_array: ['JavaScript', 'Java', 'Mocha', 'Chai'],
          user_id: null,
        };
        const response = await request(app)
          .post('/posts')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.body.error).to.contain('user_id');
        expect(response.status).to.equal(400);
      });

      test('Should return 201 if data is valid', async () => {
        const data = {
          post_header: 'Test',
          post_body: 'Another test 111',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png',
          hashtags_array: ['JavaScript', 'Java', 'Mocha', 'Chai'],
          user_id: 1,
        };
        const response = await request(app)
          .post('/posts')
          .set('Accept', 'application/json')
          .send({ data });

        console.log('data: ', response.body.data);
        console.log('error', response.body.error);
        expect(response.status).to.equal(201);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data.post_header).to.equal('Test');
        expect(response.body.data.post_body).to.equal('Another test 111');
        expect(response.body.data.user_id).to.equal(1);
      });
    });
  });
});
