const service = require('./posts.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');

const VALID_PROPERTIES = [
  'post_header',
  'post_body',
  'image_url',
  'hashtags_array',
  'user_id',
];
const REQUIRED_PROPERTIES = ['post_header', 'post_body', 'user_id'];
const has_only_valid_post_props = hasOnlyValidProperties(VALID_PROPERTIES);
const has_required_props = hasRequiredProperties(REQUIRED_PROPERTIES);

function validateDataValues(req, res, next) {
  const { data = {} } = req.body;
  const { user_id = null } = data;

  if (typeof user_id !== 'number') {
    return next({
      status: 400,
      message: 'user_id must be a number',
    });
  }
  next();
}

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
  res.status(200).json({ data: await service.list() });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.post });
}

async function create(req, res, next) {
  const data = req.body.data;
  const response = await service.create(data);
  res.status(201).json({ data });
}

async function listComments(req, res, next) {
  const { post_id } = res.locals.post;
  const comments = await service.comments(post_id);
  res.status(200).json({ data: comments });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(postExist), asyncErrorBoundary(read)],
  listComments: [
    asyncErrorBoundary(postExist),
    asyncErrorBoundary(listComments),
  ],
  create: [
    asyncErrorBoundary(has_only_valid_post_props),
    asyncErrorBoundary(has_required_props),
    validateDataValues,
    asyncErrorBoundary(create),
  ],
};
