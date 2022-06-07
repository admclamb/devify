const knex = require('../db/connection');

const TABLE = 'users_notifications';
const USERS_TABLE = 'users';

function read(user_id) {
  return knex(TABLE).select('*').where({ toUser_id: user_id });
}

function readUser(user_id) {
  return knex(USERS_TABLE).select('*').where({ user_id });
}

module.exports = {
  read,
  readUser,
};
