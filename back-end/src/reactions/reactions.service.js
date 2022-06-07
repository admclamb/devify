const knex = require('../db/connection');

const POSTS_TABLE = 'posts';
const USERS_TABLE = 'users';
const USERS_SPECIAL_LIKES_TABLE = 'special_likes';
const USERS_SAVES_TABLE = 'users_saves';
const USERS_LIKES_TABLE = 'users_likes';
const NOTIFICATIONS_TABLE = 'users_notifications';
function read(post_id, user_id, reaction) {
  let table = reaction;
  if (reaction !== 'special_likes') {
    table = `users_${reaction}`;
  }
  return knex(table).select('*').where({ post_id, user_id }).first();
}

function readUserLike(post_id, user_id) {
  return knex(USERS_LIKES_TABLE)
    .select('*')
    .where({ post_id, user_id })
    .first();
}
function readUserSave(post_id, user_id) {
  return knex(USERS_SAVES_TABLE)
    .select('*')
    .where({ post_id, user_id })
    .first();
}

function readUserSpecialLike(post_id, user_id) {
  return knex(USERS_SPECIAL_LIKES_TABLE)
    .select('*')
    .where({ post_id, user_id })
    .first();
}

function readUser(user_id) {
  return knex(USERS_TABLE).select('*').where({ user_id }).first();
}
function readPost(post_id) {
  return knex(POSTS_TABLE).select('*').where({ post_id }).first();
}
function createLike(post, user_id) {
  const { post_id, user_id: postUser_id } = post;
  return knex.transaction(async (transaction) => {
    await knex(POSTS_TABLE)
      .where({ post_id })
      .update({ likes: knex.raw('likes + 1') })
      .transacting(transaction);
    await knex(NOTIFICATIONS_TABLE).insert({
      toUser_id: postUser_id,
      fromUser_id: user_id,
      type: 'like',
    });
    return knex(USERS_LIKES_TABLE)
      .insert({ post_id, user_id })
      .returning('*')
      .then((createdReaction) => createdReaction[0]);
  });
}

function destroyLike(post_id, user_id) {
  return knex.transaction(async (transaction) => {
    await knex(POSTS_TABLE)
      .where({ post_id })
      .update({ likes: knex.raw('likes - 1') })
      .transacting(transaction);
    return knex(USERS_LIKES_TABLE).where({ post_id, user_id }).del();
  });
}
function createSpecial_like(post_id, user_id) {
  return knex.transaction(async (transaction) => {
    await knex(POSTS_TABLE)
      .where({ post_id })
      .update({ special_likes: knex.raw('special_likes + 1') })
      .transacting(transaction);
    return knex(USERS_SPECIAL_LIKES_TABLE)
      .insert({ post_id, user_id })
      .returning('*')
      .then((createdReaction) => createdReaction[0]);
  });
}

function destroySpecial_like(post_id, user_id) {
  return knex.transaction(async (transaction) => {
    await knex(POSTS_TABLE)
      .where({ post_id })
      .update({ special_likes: knex.raw('special_likes - 1') })
      .transacting(transaction);
    return knex(USERS_SPECIAL_LIKES_TABLE).where({ post_id, user_id }).del();
  });
}
function createSave(post_id, user_id) {
  return knex.transaction(async (transaction) => {
    await knex(POSTS_TABLE)
      .where({ post_id })
      .update({ saves: knex.raw('saves + 1') })
      .transacting(transaction);
    return knex(USERS_SAVES_TABLE)
      .insert({ post_id, user_id })
      .returning('*')
      .then((createdReaction) => createdReaction[0]);
  });
}

function destroySave(post_id, user_id) {
  return knex.transaction(async (transaction) => {
    await knex(POSTS_TABLE)
      .where({ post_id })
      .update({ saves: knex.raw('saves - 1') })
      .transacting(transaction);
    return knex(USERS_SAVES_TABLE).where({ post_id, user_id }).del();
  });
}
function readTotal(post_id) {
  return knex(POSTS_TABLE)
    .select('likes', 'special_likes', 'saves')
    .where({ post_id });
}

function readSaves(user_id) {
  return knex(USERS_SAVES_TABLE).select('*').where({ user_id });
}
function readLikes(user_id) {
  return knex(USERS_LIKES_TABLE).select('*').where({ user_id });
}
function readSpecialLikes(user_id) {
  return knex(USERS_SPECIAL_LIKES_TABLE).select('*').where({ user_id });
}
function readSaves(user_id) {
  return knex(USERS_SAVES_TABLE).select('*').where({ user_id });
}
module.exports = {
  readPost,
  readUser,
  read,
  readUserLike,
  readUserSave,
  readTotal,
  readUserSpecialLike,
  createLike,
  destroyLike,
  createSpecial_like,
  destroySpecial_like,
  createSave,
  destroySave,
  readSaves,
  readLikes,
  readSpecialLikes,
  readSaves,
};
