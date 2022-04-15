const INTERESTS_DATA = require("./04-interests.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE interests RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("interests").insert(INTERESTS_DATA);
    });
};
