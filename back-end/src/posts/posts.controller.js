const service = require("./posts.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExist(req, res, next) {
  const { post_id } = req.params;
  const postExist = await service.read(post_id);
  if (postExist) {
    res.locals.post = postExist;
    return next();
  }
  next({ status: 404, message: `Post ${post_id} does not exist.` });
}

async function list(req, res) {
  console.log("here");
  res.status(200).json({ data: await service.list() });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.post });
}

async function listComments(req, res, next) {
  const { post_id } = res.locals.post;
  res.status(200).json({ data: await service.comments(post_id) });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(postExist), asyncErrorBoundary(read)],
  listComments: [
    asyncErrorBoundary(postExist),
    asyncErrorBoundary(listComments),
  ],
};
