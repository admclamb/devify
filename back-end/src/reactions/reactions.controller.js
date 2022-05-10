const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./reactions.service');

async function postExist(req, res, next) {
  const { post_id } = req.body.data;
  const postExist = await service.readPost(post_id);
  if (postExist) {
    res.locals.post = postExist;
    return next();
  }
  next({ status: 404, message: `Post ${post_id} does not exist.` });
}

async function userExist(req, res, next) {
  const { user_id = null } = req.params;
  const userExist = await service.readUser(user_id);
  if (userExist) {
    res.locals.user = userExist;
    return next();
  }
  next({ status: 404, message: `User ${user_id} does not exist.` });
}

function checkQuery(req, res, next) {
  const reaction_type = getLastSegment(req.originalUrl);
  res.locals.reaction_type = reaction_type;
  next();
}

const getLastSegment = (path) => path.substring(path.lastIndexOf('/') + 1);

async function userHasntReacted(req, res, next) {
  const { post_id } = res.locals.post;
  const { user_id } = res.locals.user;
  const { reaction_type } = res.locals;
  const reaction = await service.read(post_id, user_id, reaction_type);
  if (!reaction) {
    return next();
  }
  next({
    status: 403,
    message: `User ${user_id} has already ${reaction_type.slice(
      0,
      -1
    )}d this post.`,
  });
}

async function userHasReacted(req, res, next) {
  const { post_id } = res.locals.post;
  const { user_id } = req.params;
  const { reaction_type } = res.locals;
  const reaction = await service.read(post_id, user_id, reaction_type);
  if (reaction) {
    return next();
  }
  next({
    status: 403,
    message: `User ${user_id} has not ${reaction_type.slice(
      0,
      -1
    )}d this post.`,
  });
}

async function createUserReaction(req, res, next) {
  const { post_id } = res.locals.post;
  const { user_id } = req.params;
  const { reaction_type } = res.locals;
  console.log(post_id, user_id, reaction_type);
  const reaction = await service.createReaction(
    post_id,
    user_id,
    reaction_type
  );
  res.status(201).json({ data: reaction });
}

async function destroyUserReaction(req, res, next) {
  const { post_id } = res.locals.post;
  const { user_id } = req.params;
  const { reaction_type } = res.locals;
  await service.destroyReaction(post_id, user_id, reaction_type);
  res.sendStatus(204);
}

module.exports = {
  like: [
    checkQuery,
    asyncErrorBoundary(postExist),
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(userHasntReacted),
    asyncErrorBoundary(createUserReaction),
  ],
  destroyLike: [
    checkQuery,
    asyncErrorBoundary(postExist),
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(userHasReacted),
    asyncErrorBoundary(destroyUserReaction),
  ],
  special_like: [
    checkQuery,
    asyncErrorBoundary(postExist),
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(userHasntReacted),
    asyncErrorBoundary(createUserReaction),
  ],
  destroySpecial_like: [
    checkQuery,
    asyncErrorBoundary(postExist),
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(userHasReacted),
    asyncErrorBoundary(destroyUserReaction),
  ],
  save: [
    checkQuery,
    asyncErrorBoundary(postExist),
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(userHasntReacted),
    asyncErrorBoundary(createUserReaction),
  ],
  destroySave: [
    checkQuery,
    asyncErrorBoundary(postExist),
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(userHasReacted),
    asyncErrorBoundary(destroyUserReaction),
  ],
};
