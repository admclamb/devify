const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./login.service');
const bcrypt = require('bcryptjs');
const SALT = process.env.SALT;
const jwt = require('jsonwebtoken');

const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const VALID_PROPERTIES = ['email', 'password', 'username'];
const REQUIRED_PROPERTIES = ['email', 'password'];

async function userExist(req, res, next) {
  const { email } = req.body.data;
  const userExist = (await service.read(email)) || null;
  if (userExist) {
    res.locals.user = userExist;
    return next();
  }
  next({ status: 401, message: 'username and or password is incorrect.' });
}

async function validatePassword(req, res, next) {
  const { password } = req.body.data;
  const { user } = res.locals;
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    return next();
  }
  next({ status: 401, message: 'username and or password is incorrect.' });
}

async function createToken(req, res, next) {
  const { user } = res.locals;
  const { email, user_id, username } = user;
  const token = jwt.sign({ user_id, email }, process.env.TOKEN_KEY, {
    expiresIn: '2h',
  });
  user.token = token;
  res.status(200).json({ data: { user_id, token, username } });
}

async function destroy(req, res, next) {
  const { session_id } = res.locals.session;
  await service.destroy(session_id);
  res.sendStatus(204);
}

module.exports = {
  create: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(REQUIRED_PROPERTIES),
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(validatePassword),
    asyncErrorBoundary(createToken),
  ],
  destroy: [asyncErrorBoundary(destroy)],
};
