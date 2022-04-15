/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users_profiles", (table) => {
    table.integer("user_id").references("user_id").inTable("users").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("about_you");
    table.specificType("skills_languages", "text ARRAY");
    table.string("work");
    table.string("brand_color1").defaultTo("#000000");
    table.string("brand_color2").defaultTo("#ffffff");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users_profiles");
};
