const knex = require('../db/connection');

const TABLE = 'comments';
const USERS_TABLE = 'users';
const POSTS_TABLE = 'posts';
const USERS_PROFILES_TABLE = 'users_profiles';
function list() {
  return knex(TABLE).select('*');
}

/**
 *
 * @param  post_id
 * @return get all comments for a post
 */
function readPostComments(post_id) {
  return knex(`${TABLE} as c`)
    .leftJoin(`${USERS_PROFILES_TABLE} as up`, 'c.user_id', 'up.user_id')
    .select('c*', 'c.created_at')
    .where({ post_id })
    .orderBy('c.created_at', 'asc');
}

function readUser(user_id) {
  return knex(USERS_TABLE).select('*').where({ user_id }).first();
}
function readPost(post_id) {
  return knex(POSTS_TABLE).select('*').where({ post_id }).first();
}

function destroy(comment_id) {
  return knex(TABLE).where({ comment_id }).del();
}

function create(comment) {
  return knex(TABLE)
    .insert(comment)
    .returning('*')
    .then((createdComment) => createdComment[0]);
}

module.exports = {
  list,
  readPost,
  readUser,
  readPostComments,
  destroy,
  create,
};
