const service = require('./comments.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const VALID_PROPERTIES = ['user_id', 'post_id', 'comment'];
async function postExist(req, res, next) {
  const { post_id } = req.method === 'GET' ? req.params : req.body.data;
  const postExist = await service.readPost(post_id);
  if (postExist) {
    res.locals.post = postExist;
    return next();
  }
  next({ status: 404, message: `Post ${post_id} does not exist.` });
}

async function userExist(req, res, next) {
  const { user_id } = req.body.data;
  const userExist = await service.readUser(user_id);
  if (userExist) {
    res.locals.user = userExist;
    return next();
  }
  next({ status: 404, message: `User ${user_id} does not exist.` });
}

async function commentExist(req, res, next) {
  const { comment_id } = req.body.data;
  const commentExist = await service.read(comment_id);
  if (commentExist) {
    res.locals.comment = commentExist;
    return next();
  }
  next({ status: 404, message: `Comment ${comment_id} does not exist.` });
}

async function list(req, res) {
  res.status(200).json({ data: await service.list() });
}

async function readForPost(req, res, next) {
  const { post_id } = res.locals.post;
  res.status(200).json({ data: await service.readPostComments(post_id) });
}

async function destroyComment(req, res, next) {
  const { comment_id } = req.body.data;
  console.log('here', comment_id);
  await service.destroy(comment_id);
  res.sendStatus(204);
}

async function create(req, res, next) {
  const comment = req.body.data;
  res.status(200).json({ data: await service.create(comment) });
}

function isNumber(req, res, next) {
  const { user_id } = req.body.data;
  const { post_id } = req.body.data;
  const { comment_id } = req.body.data;
  if (user_id && typeof user_id !== 'number') {
    return next({
      status: 400,
      message: `User_id ${user_id} is not a number.`,
    });
  }
  if (post_id && typeof post_id !== 'number') {
    return next({
      status: 400,
      message: `Post_id ${post_id} is not a number.`,
    });
  }
  if (comment_id && typeof comment_id !== 'number') {
    return next({
      status: 400,
      message: `Comment_id ${comment_id} is not a number.`,
    });
  }
  next();
}

function validateComment(req, res, next) {
  const { comment } = req.body.data;
  if (!comment) {
    return next({ status: 400, message: 'Comment is not defined' });
  }
  if (comment.length > 50) {
    return next({
      status: 400,
      message: 'Comment is too long.',
    });
  }
  if (typeof comment !== 'string') {
    return next({
      status: 400,
      message: 'Comment needs to be a string',
    });
  }
  next();
}

module.exports = {
  list: asyncErrorBoundary(list),
  listForPost: [asyncErrorBoundary(postExist), asyncErrorBoundary(readForPost)],
  create: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(VALID_PROPERTIES),
    asyncErrorBoundary(postExist),
    asyncErrorBoundary(userExist),
    isNumber,
    validateComment,
    asyncErrorBoundary(create),
  ],
  destroy: [
    hasOnlyValidProperties(['comment_id']),
    hasRequiredProperties(['comment_id']),
    isNumber,
    asyncErrorBoundary(commentExist),
    asyncErrorBoundary(destroyComment),
  ],
};
