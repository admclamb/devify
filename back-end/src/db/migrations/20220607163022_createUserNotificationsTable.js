/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users_notifications', (table) => {
    table.increments('notification_id').primary();
    table.integer('toUser_id').references('user_id').inTable('users');
    table
      .integer('fromUser_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('post_id')
      .references('post_id')
      .inTable('posts')
      .onDelete('CASCADE')
      .nullable();
    table.string('type').notNullable();
    table.boolean('new').defaultTo(1);
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('avatar').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users_notifications');
};
