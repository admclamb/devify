/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("comment_id").primary();
    table.integer("post_id").unsigned().notNullable();
    table.foreign("post_id").references("post_id").inTable("posts");
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("user_id").inTable("users");
    table.string("comment", 50);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
