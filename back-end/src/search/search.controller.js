const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./search.service');

const columns = {
  posts: ['post_header', 'post_body'],
  users: ['username', 'first_name', 'last_name'],
  tags: ['hashtags_array'],
};

/**
 * format as
 * /search/${type}?search=${data}
 */
function getQueryParams(req, res, next) {
  const { type } = req.params;
  const { search } = req.body.data;
  if (!type) {
    return next({ status: 400, message: 'A type of search is required' });
  }
  if (!search) {
    return next({ status: 400, message: 'A search query is required' });
  }
  res.locals.type = type;
  res.locals.search = search;
  next();
}
function validateQueryPrams(req, res, next) {
  const { type } = res.locals;
  if (!Object.keys(columns).includes(type)) {
    return next({ status: 400, message: 'Param type is not allowed' });
  }
  next();
}

async function listSearch(req, res, next) {
  const { type, search } = res.locals;
  const column_names = columns[type];
  const list =
    type === 'posts'
      ? await service.listPosts(search, column_names)
      : type === 'users'
      ? await service.listUsers(search, column_names)
      : await service.listTags(search, column_names);
  res.status(200).json({ data: list });
}

module.exports = {
  listSearch: [
    getQueryParams,
    validateQueryPrams,
    asyncErrorBoundary(listSearch),
  ],
};
