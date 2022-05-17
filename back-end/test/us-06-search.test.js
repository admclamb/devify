const { expect, should } = require('chai');
const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

describe('US-06 Searching data', () => {
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

  describe('Search by Posts', () => {});
  describe('Search by People', () => {});
  describe('Search by Tags', () => {});
});
