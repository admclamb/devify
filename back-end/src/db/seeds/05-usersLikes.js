const USERS_LIKES = require('./05-usersLikes.json');

exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE users_likes RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('users_likes').insert(USERS_LIKES);
    });
};
