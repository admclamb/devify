const service = require('./profiles.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function profileExist(req, res, next) {
  const { user_id } = req.params;
  console.log('user_id: ', user_id);
  const profileExist = await service.read(user_id);
  if (profileExist) {
    res.locals.profile = profileExist;
    return next();
  }
  next({ status: 404, message: `Profile with ${user_id} not found` });
}

function read(req, res, next) {
  res.status(200).json({ data: res.locals.profile });
}

module.exports = {
  read: [asyncErrorBoundary(profileExist), read],
};
