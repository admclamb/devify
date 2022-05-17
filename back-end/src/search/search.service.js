const knex = require('../db/connection');
const USERS_PROFILES_TABLE = 'users_profiles';
const USERS = 'users';
const POSTS = 'posts';
const COMMENTS = 'comments';

function listPosts(search, column_names) {
  return knex(POSTS)
    .select('*')
    .where(column_names[0], 'like'`%${search}%`)
    .orWhere(column_names[1], 'like', `%${search}%`);
}

function listUsers(search, column_names) {
  return knex(`${USERS} as u`)
    .join(`${USERS_PROFILES_TABLE} as up`)
    .select('u.username', 'up.*')
    .where(column_names[0], 'like'`%${search}%`)
    .orWhere(column_names[1], 'like', `%${search}%`)
    .orWhere(column_names[2], 'like', `%${search}%`);
}

function listTags(search, column_names) {
  return knex(POSTS).select('*').where(column_names[0], 'like', `%${search}%`);
}

module.exports = {
  listPosts,
  listUsers,
  listTags,
};
