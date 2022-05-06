const { text } = require('body-parser');
const { expect, should } = require('chai');
const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

describe('US-04 like save comment post', () => {
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

  describe('Like post', () => {
    test('Should return 404 if post is not found', async () => {
      const data = {
        user_id: 1,
        post_id: 100,
      };
      const response = await request(app)
        .post('/posts/:post_id/like')
        .set('Accept', 'application/json')
        .send({ data });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal(`Post ${data.post_id} not found.`);
    });

    test('Should return 404 if user is not found', async () => {
      const data = {
        user_id: 100,
        post_id: 3,
      };
      const response = await request(app)
        .post('/posts/:post_id/like')
        .set('Accept', 'application/json')
        .send({ data });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal(`User ${data.user_id} not found.`);
    });
    test('Should return 403 if user already has liked the post', async () => {
      const data = {
        user_id: 1,
        post_id: 3,
      };
      // First liking the post
      await request(app)
        .post('/posts/:post_id/like')
        .set('Accept', 'application/json')
        .send({ data });

      // Second time liking the post
      const response = await request(app)
        .post('/posts/:post_id/like')
        .set('Accept', 'application/json')
        .send({ data });
      expect(response.status).to.equal(403);
      expect(response.body.error).to.equal(
        `User ${user_id} has already liked this post.`
      );
    });

    test('Should return 201 if post is liked', async () => {
      const data = {
        user_id: 1,
        post_id: 3,
      };
      const response = await request(app)
        .post('/posts/:post_id/like')
        .set('Accept', 'application/json')
        .send({ data });

      expect(response.status).to.equal(201);
      expect(response.body.error).to.be.undefined;
      expect(response.body.data.user_id).to.equal(1);
      expect(response.body.data.post_id).to.equal(3);
    });
  });
});
