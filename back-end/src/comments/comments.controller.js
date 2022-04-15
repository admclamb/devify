const service = require("./comments.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  res.status(200).json({ data: await service.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
