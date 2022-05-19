const knex = require('../db/connection');
const TABLE = 'sessions';
const USERS_TABLE = 'users';
const USERS_PROFILES_TABLE = 'users_profiles';
function create(user_id) {
  return knex(TABLE)
    .insert({ user_id })
    .returning('*')
    .then((createdPost) => createdPost[0]);
}

function readFromUserProfile(user_id) {
  return knex(USERS_PROFILES_TABLE).select('*').where({ user_id }).first();
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
  readFromUserProfile,
  destroy,
};
