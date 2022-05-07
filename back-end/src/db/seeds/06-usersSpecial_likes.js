const USERS_SPECIAL_LIKES = require('./06-usersSpecial_likes.json');

exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE special_likes RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('special_likes').insert(USERS_SPECIAL_LIKES);
    });
};
