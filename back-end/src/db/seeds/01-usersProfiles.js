const USERS_PROFILES_DATA = require("./01-usersProfiles.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE users_profiles RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("users_profiles").insert(USERS_PROFILES_DATA);
    });
};
