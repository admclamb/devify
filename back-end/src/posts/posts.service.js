const knex = require('../db/connection');

const TABLE = 'posts';
const USERS_TABLE = 'users';
const COMMENTS_TABLE = 'comments';
const USERS_PROFILES_TABLE = 'users_profiles';
function list() {
  return knex(TABLE).select('*');
}

/**
 * function that list the post with author and comments
 */
function listWithAll() {
  return knex(`${TABLE} as p`)
    .join(`${USERS_PROFILES_TABLE} as up`, 'p.user_id', 'up.user_id')
    .join(`${COMMENTS_TABLE} as c`, 'p.user_id', 'c.user_id')
    .select('p.*', 'up.first_name', 'up.last_name', 'c.*');
}

function readWithAll(post_id) {
  return knex(`${TABLE} as p`)
    .join(`${USERS_PROFILES_TABLE} as up`, 'p.user_id', 'up.user_id')
    .join(`${COMMENTS_TABLE} as c`, 'p.user_id', 'c.user_id')
    .select('p.*', 'up.first_name', 'up.last_name', 'c.*')
    .where({ 'p.post_id': post_id })
    .then((posts) => posts[0]);
}

function read(post_id) {
  return knex(TABLE).select('*').where({ post_id }).first();
}

function readUser(user_id) {
  return knex(USERS_TABLE).select('*').where({ user_id }).first();
}

function create(post) {
  return knex(TABLE)
    .insert(post)
    .returning('*')
    .then((createdPost) => createdPost[0]);
}

function comments(post_id) {
  return knex(`${COMMENTS_TABLE} as c`)
    .join(`${USERS_PROFILES_TABLE} as up`, 'c.user_id', 'up.user_id')
    .select('c.*', 'up.*')
    .where({ 'c.post_id': post_id });
}

module.exports = {
  list,
  listWithAll,
  readWithAll,
  read,
  readUser,
  comments,
  create,
};
