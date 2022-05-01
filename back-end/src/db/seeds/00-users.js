const bcrypt = require('bcryptjs');
const SALT = process.env.SALT;
const USERS_DATA = require('./00-users.json');
exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
    .then(function () {
      return USERS_DATA.forEach((USER) => {
        USER.password = bcrypt.hashSync(USER.password, parseInt(SALT));
        return knex('users')
          .insert(USER)
          .returning('*')
          .then((createdUser) => createdUser[0]);
      });
    });
};
