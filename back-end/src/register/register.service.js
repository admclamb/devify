const knex = require('../db/connection');
const TABLE = 'users';
const USERS_PROFILES_TABLE = 'users_profiles';

function read(email) {
  return knex(TABLE).select('*').where({ email }).first();
}

function create(user) {
  return knex(TABLE)
    .insert(user)
    .returning('*')
    .then((createdUser) => createdUser[0]);
}

function createUsersProfile(user) {
  console.log('inside register.service: ', user);
  return knex(USERS_PROFILES_TABLE)
    .insert(user)
    .returning('*')
    .then((createdUser) => createdUser[0]);
}

function readFromUsername(username) {
  return knex(TABLE).select('*').where({ username }).first();
}

module.exports = {
  read,
  create,
  createUsersProfile,
  readFromUsername,
};
