const kenx = require("../db/connection");

const TABLE = "comments";

function list() {
  return knex(TABLE).select("*");
}

module.exports = {
  list,
};
