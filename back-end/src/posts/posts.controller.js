const service = require("./posts.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExist(req, res, next) {
  console.log("here");
  const { post_id } = req.params;
  const postExist = await service.read(post_id);
  if (postExist) {
    res.locals.post = postExist;
    return next();
  }
  next({ status: 404, message: `Post ${post_id} does not exist.` });
}

async function list(req, res) {
  res.status(200).json({ data: await service.list() });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.post });
}

async function listComments(req, res, next) {
  console.log("here inside comments");
  const { post_id } = res.locals.post;
  const comments = await service.comments(post_id);
  console.log("comments", comments);
  res.status(200).json({ data: comments });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(postExist), asyncErrorBoundary(read)],
  listComments: [
    asyncErrorBoundary(postExist),
    asyncErrorBoundary(listComments),
  ],
};
