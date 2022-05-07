const knex = require('../db/connection');

const POSTS_TABLE = 'posts';
const USERS_TABLE = 'users';
const USERS_SPECIAL_LIKES_TABLE = 'special_likes';
const USERS_SAVES = 'users_saves';
const USERS_LIKES_TABLE = 'users_likes';

function read(post_id, user_id, reaction) {
  let table = reaction;
  if (reaction !== 'special_likes') {
    table = `users_${reaction}`;
  }
  return knex(table).select('*').where({ post_id, user_id }).first();
}

function readUser(user_id) {
  return knex(USERS_TABLE).select('*').where({ user_id }).first();
}
function readPost(post_id) {
  return knex(POSTS_TABLE).select('*').where({ post_id }).first();
}

function createReaction(post_id, user_id, reaction) {
  let table = reaction;
  if (reaction !== 'special_likes') {
    table = `users_${reaction}`;
  }
  return knex.transaction(async (transaction) => {
    await knex(POSTS_TABLE)
      .where({ post_id })
      .update({
        reaction: knex.raw(`${reaction} + 1`),
      })
      .transacting(transaction);
    return knex(table)
      .insert(like)
      .returning('*')
      .then((createdLike) => createdLike[0]);
  });
}

function destroyReaction(post_id, user_id, reaction) {
  let table = reaction;
  if (reaction !== 'special_likes') {
    table = `users_${reaction}`;
  }
  return knex.transaction(async (transaction) => {
    await knex(POSTS_TABLE)
      .where({ post_id })
      .update({
        reaction: knex.raw(`${reaction} - 1`),
      })
      .transacting(transaction);
    return knex(table).where({ post_id, user_id }).del();
  });
}

module.exports = {
  readPost,
  readUser,
  read,
  createReaction,
  destroyReaction,
};
