const service = require('./profiles.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const VALID_PROPERTIES = [
  'first_name',
  'last_name',
  'about_you',
  'work',
  'avatar',
  'username',
];

async function profileExist(req, res, next) {
  const { user_id } = req.params;
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
async function readStats(req, res, next) {
  const { user_id } = res.locals.profile;
  res.status(200).json({ data: await service.readStats(user_id) });
}

/*
 * Checks to see if being passed a username to update and if so update the username
 */
async function checkAndUpdateUsername(req, res, next) {
  const { username = null } = req.body.data;
  if (username) {
    const usernameExist = await checkUsername(username);
    if (usernameExist) {
      return next({ status: 400, message: 'Username already exists' });
    }
    const updatedUsername = await updateUsername(user_id, username);
    res.locals.username = updatedUsername;
  }
  next();
}

async function update(req, res, next) {
  const { data } = req.body;
  const { username = null } = res.locals;
  if (username) {
    delete data.username;
    const updatedProfile = await service.update(data);
    res.status(200).json({ data: { ...updatedProfile, username } });
  } else {
    const updatedProfile = await service.update(data);
    res.status(200).json({ data: updatedProfile });
  }
}

module.exports = {
  read: [asyncErrorBoundary(profileExist), read],
  readStats: [asyncErrorBoundary(profileExist), asyncErrorBoundary(readStats)],
  update: [
    asyncErrorBoundary(profileExist),
    hasOnlyValidProperties(VALID_PROPERTIES),
    asyncErrorBoundary(checkAndUpdateUsername),
    asyncErrorBoundary(update),
  ],
};
