const { expect } = require("chai");
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

          expect(response.body.status).to.equal(200);
          expect(response.body.data).to.include({
            post_id: 1,
            post_header: "Wubba lubba dub dub",
            post_body: "This is Rick , I don't love my grand kids.",
            post_url: null,
            user_id: 1,
          });
        });
      });

      describe("GET posts/:post_id/comments", () => {
        test("returns 404 for non-existent post_id", async () => {
          const response = await request(app)
            .get("posts/9999/comments")
            .set("Accept", "application/json");

          expect(response.body.status).to.equal(404);
          expect(repsonse.body.error).to.contain("9999");
        });

        test("returns 200 for comments from post_id", async () => {
          const response = await request(app)
            .get("posts/2/comments")
            .set("Accept", "application/json");

          expect(response.body.status).to.equal(200);
          expect(response.body.data).to.include({
            comment_id: 1,
            post_id: 2,
            user_id: 1,
            comment: "Bird Person, Contact me",
          });
        });
      });
    });

    describe("comments", () => {
      describe("GET comments", () => {
        test("returns 200 for comments", async () => {
          const response = await request(app)
            .get("/comments")
            .set("Accept", "application/json");

          expect(response.body.status).to.equal(200);
          expect(response.body.data).to.include({
            comment_id: 1,
            post_id: 2,
            user_id: 1,
            comment: "Bird Person, Contact me",
          });
        });
      });
    });
  });
});
