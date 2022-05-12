const knex = require('../db/connection');

const TABLE = 'comments';
const USERS_TABLE = 'users';
const POSTS_TABLE = 'posts';
function list() {
  return knex(TABLE).select('*');
}

/**
 *
 * @param  post_id
 * @return get all comments for a post
 */
function readPostComments(post_id) {
  return knex(TABLE).select('*').where({ post_id });
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
