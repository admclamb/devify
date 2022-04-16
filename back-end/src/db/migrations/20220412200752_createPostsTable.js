/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("post_id").primary();
    table.string("post_header");
    table.string("post_body");
    table.string("image_url").nullable();
    table.specificType("hashtags_array", "text ARRAY");
    table.integer("user_id").references("user_id").inTable("users");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
