const knex = require('../db/connection');

const TABLE = 'posts';
const USERS_TABLE = 'users';
const COMMENTS_TABLE = 'comments';
const USERS_PROFILES_TABLE = 'users_profiles';
const USERS_LIKES_TABLE = 'users_likes';
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
  console.log('post_id: ', post_id);
  return knex(TABLE).select('*').where({ post_id }).first();
}

function readUser(user_id) {
  return knex(USERS_TABLE).select('*').where({ user_id }).first();
}

function readLike(post_id, user_id) {
  return knex(USERS_LIKES_TABLE)
    .select('*')
    .where({ post_id, user_id })
    .first();
}

function create(post) {
  return knex(TABLE)
    .insert(post)
    .returning('*')
    .then((createdPost) => createdPost[0]);
}

function createLike(like) {
  const { post_id } = like;
  return knex.transaction(async (transaction) => {
    await knex(TABLE)
      .where({ post_id })
      .update({
        likes: knex.raw('likes + 1'),
      })
      .transacting(transaction);
    return knex(USERS_LIKES_TABLE)
      .insert(like)
      .returning('*')
      .then((createdLike) => createdLike[0]);
  });
}

function destroyLike(post_id, user_id) {
  return knex.transaction(async (transaction) => {
    await knex(TABLE)
      .where({ post_id })
      .update({
        likes: knex.raw('likes - 1'),
      })
      .transacting(transaction);
    return knex(USERS_LIKES_TABLE).where({ post_id, user_id }).del();
  });
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
  readLike,
  createLike,
  destroyLike,
  comments,
  create,
};
