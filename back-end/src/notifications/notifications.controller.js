const service = require('./notifications.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function userExist(req, res, next) {
  const { user_id } = req.params;
  const userExist = await service.readUser(user_id);
  if (userExist) {
    res.locals.user = userExist;
    return next();
  }
  next({ status: 404, message: `User ${user_id} does not exist.` });
}

async function read(req, res, next) {
  const { user_id } = res.locals.user;
  console.log('in here');
  const notifications = await service.read(user_id);
  console.log(notifications);
  res.status(200).json({ data: notifications });
}

module.exports = {
  read: [asyncErrorBoundary(userExist), asyncErrorBoundary(read)],
};
