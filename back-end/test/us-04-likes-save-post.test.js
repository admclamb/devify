const { text } = require('body-parser');
const { expect, should } = require('chai');
const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

describe('US-04 likes save  post', () => {
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
  describe('Liking a post', () => {
    describe('POST Like post', () => {
      test('Should return 404 if post is not found', async () => {
        const data = {
          post_id: 100,
        };
        const response = await request(app)
          .post('/reactions/1/likes')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          `Post ${data.post_id} does not exist.`
        );
      });

      test('Should return 404 if user is not found', async () => {
        const data = {
          post_id: 3,
        };
        const response = await request(app)
          .post('/reactions/100/likes')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(`User 100 does not exist.`);
      });
      test('Should return 403 if user already has liked the post', async () => {
        const data = {
          post_id: 3,
        };
        const response = await request(app)
          .post('/reactions/1/likes')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(403);
        expect(response.body.error).to.equal(
          `User ${data.user_id} has already liked this post.`
        );
      });

      test('Should return 201 if post is liked', async () => {
        const data = {
          post_id: 5,
        };
        const response = await request(app)
          .post('/reactions/1/likes')
          .set('Accept', 'application/json')
          .send({ data });

        console.log(response.body.error);
        expect(response.status).to.equal(201);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data.user_id).to.equal(1);
        expect(response.body.data.post_id).to.equal(5);
      });
    });
    describe('DELETE unlike post', () => {
      test('Should return 404 if post is not found', async () => {
        const data = {
          post_id: 100,
        };
        const response = await request(app)
          .delete('/reactions/1/likes')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          `Post ${data.post_id} does not exist.`
        );
      });
      test('Should return 404 if user is not found', async () => {
        const data = {
          post_id: 3,
        };
        const response = await request(app)
          .delete('/reactions/100/likes')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(`User 100 does not exist.`);
      });
      test('Should return 403 if user has not liked the post yet', async () => {
        const data = {
          post_id: 5,
        };
        const response = await request(app)
          .delete('/reactions/1/likes')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(403);
        expect(response.body.error).to.equal(`User 1 has not liked this post.`);
      });
      test('Should return 204 if user has unliked the post', async () => {
        const data = {
          post_id: 4,
        };
        const response = await request(app)
          .delete('/reactions/1/likes')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(204);
      });
    });
  });
  describe('special_like a post', () => {
    describe('POST special_like a post', () => {
      test('Should return 404 if post is not found', async () => {
        const data = {
          post_id: 100,
        };
        const response = await request(app)
          .post('/reactions/1/special_likes')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          `Post ${data.post_id} does not exist.`
        );
      });

      test('Should return 404 if user is not found', async () => {
        const data = {
          post_id: 3,
        };
        const response = await request(app)
          .post('/reactions/100/special_likes')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(`User 100 does not exist.`);
      });
      test('Should return 403 if user already has special_liked the post', async () => {
        const data = {
          post_id: 3,
        };
        const response = await request(app)
          .post('/reactions/1/special_likes')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(403);
        expect(response.body.error).to.equal(
          `User ${data.user_id} has already special_liked this post.`
        );
      });

      test('Should return 201 if post is special_liked', async () => {
        const data = {
          post_id: 5,
        };
        const response = await request(app)
          .post('/reactions/1/special_likes')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(201);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data.user_id).to.equal(1);
        expect(response.body.data.post_id).to.equal(5);
      });
    });
    describe('DELETE un-special_like a post', () => {
      test('Should return 404 if post is not found', async () => {
        const data = {
          post_id: 100,
        };
        const response = await request(app)
          .delete('/reactions/1/special_likes')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          `Post ${data.post_id} does not exist.`
        );
      });
      test('Should return 404 if user is not found', async () => {
        const data = {
          post_id: 3,
        };
        const response = await request(app)
          .delete('/reactions/100/special_likes')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(`User 100 does not exist.`);
      });
      test('Should return 403 if user has not special_liked the post yet', async () => {
        const data = {
          post_id: 5,
        };
        const response = await request(app)
          .delete('/reactions/1/special_likes')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(403);
        expect(response.body.error).to.equal(
          `User 1 has not special_liked this post.`
        );
      });
      test('Should return 204 if user has unspecial_liked the post', async () => {
        const data = {
          post_id: 4,
        };
        const response = await request(app)
          .delete('/reactions/1/special_likes')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(204);
      });
    });
  });
  describe('save a post', () => {
    describe('POST save a post', () => {
      test('Should return 404 if post is not found', async () => {
        const data = {
          post_id: 100,
        };
        const response = await request(app)
          .post('/reactions/1/saves')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          `Post ${data.post_id} does not exist.`
        );
      });

      test('Should return 404 if user is not found', async () => {
        const data = {
          post_id: 3,
        };
        const response = await request(app)
          .post('/reactions/100/saves')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(`User 100 does not exist.`);
      });
      test('Should return 403 if user already has saved the post', async () => {
        const data = {
          post_id: 3,
        };
        const response = await request(app)
          .post('/reactions/1/saves')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(403);
        expect(response.body.error).to.equal(
          `User ${data.user_id} has already saved this post.`
        );
      });

      test('Should return 201 if post is saved', async () => {
        const data = {
          post_id: 5,
        };
        const response = await request(app)
          .post('/reactions/1/saves')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(201);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data.user_id).to.equal(1);
        expect(response.body.data.post_id).to.equal(5);
      });
    });
    describe('DELETE un-save a post', () => {
      test('Should return 404 if post is not found', async () => {
        const data = {
          post_id: 100,
        };
        const response = await request(app)
          .delete('/reactions/1/saves')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          `Post ${data.post_id} does not exist.`
        );
      });
      test('Should return 404 if user is not found', async () => {
        const data = {
          post_id: 3,
        };
        const response = await request(app)
          .delete('/reactions/100/saves')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(`User 100 does not exist.`);
      });
      test('Should return 403 if user has not saved the post yet', async () => {
        const data = {
          post_id: 5,
        };
        const response = await request(app)
          .delete('/reactions/1/saves')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(403);
        expect(response.body.error).to.equal(`User 1 has not saved this post.`);
      });
      test('Should return 204 if user has unsaved the post', async () => {
        const data = {
          post_id: 4,
        };
        const response = await request(app)
          .delete('/reactions/1/saves')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(204);
      });
    });
  });
});
