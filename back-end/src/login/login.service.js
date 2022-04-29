const knex = require('../db/connection');
const TABLE = 'sessions';
const USERS_TABLE = 'users';
function create(user_id) {
  return knex(TABLE)
    .insert({ user_id })
    .returning('*')
    .then((createdPost) => createdPost[0]);
}

function readFromUser(user_id) {
  return knex(TABLE).select('*').where({ user_id }).first();
}

function read(email) {
  return knex(USERS_TABLE).select('*').where({ email }).first();
}

function destroy(session_id) {
  return knex(TABLE).where({ session_id }).del();
}

module.exports = {
  create,
  read,
  readFromUser,
  destroy,
};
