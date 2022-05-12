const { expect, should } = require('chai');
const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

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

  describe('Comments', () => {
    describe('POST Create Comment', () => {
      test('Should return 400 if data is missing', async () => {
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({});
        expect(response.status).to.equal(400);
      });
      test('Should return 400 if user_id is missing', async () => {
        const data = {
          post_id: 1,
          comment: 'Testing',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('user_id');
      });
      test('Should return 400 if user_id is empty', async () => {
        const data = {
          user_id: '',
          post_id: 1,
          comment: 'Testing',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('user_id');
      });
      test('Should return 400 if user_id is not a number', async () => {
        const data = {
          user_id: '1',
          post_id: 1,
          comment: 'Testing',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('user_id');
      });
      test('Should return 404 if user_id not found', async () => {
        const data = {
          user_id: 100,
          post_id: 1,
          comment: 'Testing',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(`User ${user_id} not found.`);
      });
      test('Should return 400 if post_id is missing', async () => {
        const data = {
          user_id: 1,
          comment: 'Testing',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('post_id');
      });
      test('Should return 400 if post_id is empty', async () => {
        const data = {
          user_id: 1,
          post_id: '',
          comment: 'Testing',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('post_id');
      });
      test('Should return 400 if post_id is not a number', async () => {
        const data = {
          user_id: 1,
          post_id: '1',
          comment: 'Testing',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('post_id');
      });
      test('Should return 404 if post_id not found', async () => {
        const data = {
          user_id: 1,
          post_id: 100,
          comment: 'Testing',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(`Post ${post_id} not found.`);
      });
      test('Should return 400 if comment is missing', async () => {
        const data = {
          user_id: 1,
          post_id: 100,
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('comment');
      });
      test('Should return 400 if comment is empty', async () => {
        const data = {
          user_id: 1,
          post_id: 100,
          comment: '',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('comment');
      });
      test('Should return 400 if comment is not a string', async () => {
        const data = {
          user_id: 1,
          post_id: 100,
          comment: 129872198,
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Comment needs to be a string');
      });
      test('Should return 400 if comment length is greater than 50 characters', async () => {
        const data = {
          user_id: 1,
          post_id: 1,
          comment:
            '01234567890123456789012345678901234567890123456789 Comment over 50 characters',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Comment too long');
      });
      test('Should return 200 if a comment is created', async () => {
        const data = {
          user_id: 1,
          post_id: 1,
          comment: 'This is a successful comment',
        };
        const response = await request(app)
          .post('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data.comment).to.equal(
          'This is a successful comment'
        );
        expect(response.body.data.user_id).to.equal(1);
        expect(response.body.data.post_id).to.equal(1);
      });
    });
    describe('DELETE Delete a comment', () => {
      test('Should return 400 if comment_id is missing', async () => {
        const data = {};
        const response = await request(app)
          .delete('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('comment_id');
      });
      test('Should return 400 if comment_id is empty', async () => {
        const data = { comment_id: '' };
        const response = await request(app)
          .delete('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('comment_id');
      });
      test('Should return 400 if comment_id is not a number', async () => {
        const data = { comment_id: '1' };
        const response = await request(app)
          .delete('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Comment_id must be a number');
      });
      test('Should return 404 if comment_id is not found', async () => {
        const data = { comment_id: 100 };
        const response = await request(app)
          .delete('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          `Comment ${data.comment_id} not found.`
        );
      });
      test('Shoud return 204 if comment is deleted', async () => {
        const data = { comment_id: 1 };
        const response = await request(app)
          .delete('/comments')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(204);
        expect(response.body.error).to.be.undefined;
      });
    });
  });
});
