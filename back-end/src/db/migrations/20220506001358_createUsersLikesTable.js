/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users_likes', (table) => {
    table
      .integer('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('post_id')
      .references('post_id')
      .inTable('posts')
      .onDelete('CASCADE');
    table.unique(['user_id', 'post_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users_likes');
};
