const knex = require('../db/connection');

const TABLE = 'users_profiles';

function read(user_id) {
  return knex(TABLE).select('*').where({ user_id }).first();
}

function readStats(user_id) {
  return knex.raw('');
  // return knex(`${TABLE} as up`)
  //   .leftJoin('comments as c', 'up.user_id', 'c.user_id')
  //   .leftJoin('posts as p', 'up.user_id', 'p.user_id')
  //   .leftJoin('users_saves as s', 'up.user_id', 's.user_id')
  //   .count({
  //     comments: 'c.comment_id',
  //     posts: 'p.post_id',
  //     saves: 's.*',
  //   });
}

module.exports = {
  read,
  readStats,
};
