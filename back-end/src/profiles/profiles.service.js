const knex = require('../db/connection');

const TABLE = 'users_profiles';

function read(user_id) {
  return knex(TABLE).select('*').where({ user_id }).first();
}

module.exports = {
  read,
};
