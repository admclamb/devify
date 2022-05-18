const knex = require('../db/connection');
const USERS_PROFILES_TABLE = 'users_profiles';
const USERS = 'users';
const POSTS = 'posts';
const COMMENTS = 'comments';

function listPosts(search, column_names) {
  console.log('8', column_names, search);
  return knex(POSTS)
    .select('*')
    .whereLike(column_names[0], `%${search}%`)
    .orWhereLike(column_names[1], `%${search}%`);
}

function listUsers(search, column_names) {
  console.log('16', column_names, search);
  return knex(`${USERS} as u`)
    .join(`${USERS_PROFILES_TABLE} as up`)
    .select('u.username', 'up.*')
    .whereLike(column_names[0], `%${search}%`)
    .orWhereLike(column_names[1], `%${search}%`)
    .orWhereLike(column_names[2], `%${search}%`);
}

function listTags(search, column_names) {
  console.log('26', column_names, search);
  return knex(POSTS).select('*').whereLike(column_names[0], `%${search}%`);
}

module.exports = {
  listPosts,
  listUsers,
  listTags,
};
