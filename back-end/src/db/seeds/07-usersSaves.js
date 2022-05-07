const USERS_SAVES = require('./07-usersSaves.json');

exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE users_saves RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('users_saves').insert(USERS_SAVES);
    });
};
