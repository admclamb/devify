const knex = require('../db/connection');
const USERS_PROFILES_TABLE = 'users_profiles';
const USERS = 'users';
const POSTS = 'posts';
const COMMENTS = 'comments';

function listPosts(search, column_names) {
  return knex(`${POSTS} as p`)
    .leftJoin(`${USERS_PROFILES_TABLE} as up`, 'p.user_id', 'up.user_id')
    .select('p.*', 'up.first_name', 'up.last_name')
    .whereLike(column_names[0], `%${search}%`)
    .orWhereLike(column_names[1], `%${search}%`);
}

function listUsers(search, column_names) {
  return knex(`${USERS} as u`)
    .join(`${USERS_PROFILES_TABLE} as up`, 'u.user_id', 'up.user_id')
    .select('u.username', 'up.*')
    .whereLike(column_names[0], `%${search}%`)
    .orWhereLike(column_names[1], `%${search}%`)
    .orWhereLike(column_names[2], `%${search}%`)
    .orWhereLike(column_names[0], `%${search.split(' ')[0]}%`);
}

function listTags(search, column_names) {
  return knex(POSTS).select('*').whereLike(column_names[0], `%${search}%`);
}

module.exports = {
  listPosts,
  listUsers,
  listTags,
};
