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
  const { email } = user;
  const { username } = user;
  const { password } = user;
  const formattedUser = {
    email,
    username,
    password,
  };
  const createdUser = await service.create(formattedUser);
  res.locals.createdUser = createdUser;
  next();
}

async function createUsersProfile(req, res, next) {
  const { user } = res.locals;
  const { user_id } = res.locals;
  const { first_name } = user;
  const { last_name } = user;
  const formattedUserProfile = {
    user_id,
    first_name,
    last_name,
  };
  const createdProfile = await service.createUsersProfile(formattedUserProfile);
  res.locals.profile = createdProfile;
  next();
}

async function createToken(req, res, next) {
  const { user } = res.locals;
  const { email, user_id, username } = user;
  const { first_name } = res.locals.createdProfile;
  const { last_name } = res.locals.createdProfile;
  const token = jwt.sign({ user_id, email }, process.env.TOKEN_KEY, {
    expiresIn: '2h',
  });
  user.token = token;
  const data = {
    user_id,
    token,
    username,
    first_name,
    last_name,
  };
  res.status(200).json({ data });
}

module.exports = {
  create: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(VALID_PROPERTIES),
    asyncErrorBoundary(emailExist),
    asyncErrorBoundary(usernameExist),
    asyncErrorBoundary(encryptPassword),
    asyncErrorBoundary(create),
    asyncErrorBoundary(createUsersProfile),
    asyncErrorBoundary(createToken),
  ],
};
