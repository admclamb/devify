const knex = require("../db/connection");

const TABLE = "posts";
const COMMENTS_TABLE = "comments";
function list() {
  return knex(TABLE).select("*");
}

function read(post_id) {
  return knex(TABLE).select("*").where({ post_id }).first();
}

function comments(post_id) {
  return knex(COMMENTS_TABLE).select("*").where({ post_id });
}

module.exports = {
  list,
  read,
  comments,
};
