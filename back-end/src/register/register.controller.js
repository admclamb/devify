const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./register.service');
const bcrypt = require('bcryptjs');
const { SALT } = process.env;
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const VALID_PROPERTIES = ['email', 'password'];

async function userExist(req, res, next) {
  const { email } = req.body.data;
  const user = await service.read(email);
  if (user) {
    res.status(409).json({ data: 'User already exist. Please Login' });
  }
  next();
}

async function emailExist(req, res, next) {
  const { email } = req.body.data;
  const user = await service.read(email);
  if (user) {
    return next({
      status: 409,
      messgae: 'email already is in use. Please try a different one.',
    });
  }
  next();
}

async function usernameExist(req, res, next) {
  const { username } = req.body.data;
  const user = await service.readFromUsername(username);
  if (user) {
    return next({
      status: 409,
      messgae: 'username already in use. Please try a different one.',
    });
  }
  next();
}

async function encryptPassword(req, res, next) {
  const { data } = req.body;
  const { password } = data;
  const hashedPassword = await bcrypt.hash(password, SALT);
  res.locals.user = {
    ...data,
    email: data.email.toLowerCase(),
    password: hashedPassword,
  };
  next();
}

async function create(req, res, next) {
  const { user } = res.locals;
  const createdUser = await service.create(user);
  res.locals.user = createdUser;
  next();
}

function createToken(req, res, next) {
  const { user } = res.locals;
  const { email } = user;
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: '2h',
  });
  user.token = token;
  res.status(201).json(user);
}

module.exports = {
  create: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(VALID_PROPERTIES),
    asyncErrorBoundary(emailExist),
    asyncErrorBoundary(usernameExist),
    asyncErrorBoundary(encryptPassword),
    asyncErrorBoundary(create),
    asyncErrorBoundary(createToken),
  ],
};
