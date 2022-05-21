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
  console.log('req.body.data : => ', req.body.data);
  const { user_id } = res.locals.profile;
  console.log(username);
  if (username && username !== res.locals.profile.username) {
    const usernameExist = await service.checkUsername(username);
    if (usernameExist) {
      if (user_id === usernameExist.user_id) {
        return next();
      } else {
        return next({
          status: 400,
          message: 'Username already in use. Please try again.',
        });
      }
    }
    const updatedUsername = await service.updateUsername(user_id, username);
    res.locals.username = updatedUsername;
  }
  next();
}

async function update(req, res, next) {
  const { data } = req.body;
  const { username = null } = res.locals;
  const { user_id } = res.locals.profile;
  if (username) {
    delete data.username;

    const updatedProfile = {
      ...res.locals.profile,
      ...data,
    };
    const response = await service.update(updatedProfile, user_id);
    res.status(200).json({ data: { ...response, username } });
  } else {
    delete data.username;
    const updatedProfile = {
      ...res.locals.profile,
      ...data,
    };
    const response = await service.update(updatedProfile, user_id);
    res.status(200).json({ data: { ...response, username } });
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
