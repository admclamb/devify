const knex = require('../db/connection');
const USERS_PROFILES_TABLE = 'users_profiles';

function update(user_id, image_url) {
  return knex(USERS_PROFILES_TABLE)
    .select('*')
    .where({ user_id })
    .update({ avatar: image_url });
}

module.exports = {
  update,
};
