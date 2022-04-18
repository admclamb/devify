const { expect, should } = require("chai");
const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");

/**
 * US-01 List posts and list comments for front end user stories
 */

describe("US-01 list posts and comments", () => {
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

  describe("App", () => {
    describe("Not found handler", () => {
      test("returns 404 for non-existent route", async () => {
        const response = await request(app)
          .get("/notaroute")
          .set("Accept", "application/json");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Path not found: /notaroute");
      });
    });

    describe("Posts", () => {
      describe("GET /posts", () => {
        test("returns 200 for posts", async () => {
          const response = await request(app)
            .get("/posts")
            .set("Accept", "application/json");
          expect(response.status).to.equal(200);
          expect(response.body.error).to.be.undefined;
          expect(response.body.data).to.have.lengthOf(3);
          expect(response.body.data[0].post_id).to.equal(1);
          expect(response.body.data[1].post_id).to.equal(2);
          expect(response.body.data[2].post_id).to.equal(3);
        });
      });

      describe("GET /posts/:post_id", () => {
        test("returns 404 for non-existent post_id", async () => {
          const response = await request(app)
            .get("/posts/9999")
            .set("Accept", "application/json");
          expect(response.status).to.equal(404);
          expect(response.body.error).to.contain("9999");
        });

        test("should return 200 and post from post_id", async () => {
          const response = await request(app)
            .get("/posts/2")
            .set("Accept", "application/json");

          expect(response.status).to.equal(200);
          expect(response.body.error).to.be.undefined;
          expect(response.body.data.post_id).to.equal(2);
          expect(response.body.data.post_header).to.equal("Bird Person Quote");
        });
      });

      describe("GET /posts/:post_id/comments", () => {
        test("should return 404 for non-existent post_id", async () => {
          const response = await request(app)
            .get("/posts/9999/comments")
            .set("Accept", "application/json");
          expect(response.status).to.equal(404);
          expect(response.body.error).to.contain("9999");
        });

        test("should return 200 and comments from post_id", async () => {
          const response = await request(app)
            .get("/posts/2/comments")
            .set("Accept", "application/json");

          expect(response.status).to.equal(200);
          expect(response.body.error).to.be.undefined;
          expect(response.body.data[0].post_id).to.equal(2);
          expect(response.body.data[0].comment).to.equal(
            "Bird Person, Contact me"
          );
        });
      });
    });
  });
});
