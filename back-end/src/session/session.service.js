const knex = require('../db/connection');
const TABLE = 'sessions';
const 
function create(user_id) {
  return knex(TABLE)
    .insert({ user_id })
    .returning('*')
    .then((createdPost) => createdPost[0]);
}

function read(session_id) {
  return knex(TABLE).select('*').where({ session_id }).first();
}

function readUser(username) {

}

function destroy(session_id) {
  return knex(TABLE).where({ session_id }).del();
}

module.exports = {
  create,
  read,
  destroy,
  readUser
};
