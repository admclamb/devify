const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./login.service');
const bcrypt = require('bcryptjs');
const SALT = process.env.SALT || 10;
const jwt = require('jsonwebtoken');

const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const VALID_PROPERTIES = ['email', 'password'];
// function checkLogin(req, res, next) {
//   // if (session.user_id) {
//   //   return next();
//   // }
//   next({
//     status: 401,
//     message: 'Unauthorized. authentication has failed or not yet been proven.',
//   });
// }

// async function validateLogin(req, res, next) {
//   if (!req.body.data) {
//     return next({ status: 400, message: 'data is missing.' });
//   }
//   const { email = null } = req.body.data;
//   const { password = null } = req.body.data;
//   if (!email || !password) {
//     return next({ status: 400, message: 'email or password is missing.' });
//   }
//   const user = await service.readUser(email.toLowerCase());
//   if (user) {
//     res.locals.user = user;
//     return next();
//   }
//   next({ status: 404, message: `Customer: ${email} does not exist.` });
// }

// async function validatePassword(req, res, next) {
//   const { password = '' } = req.body.data;
//   const { user = {} } = res.locals;
//   const validPassword = await bcrypt.compare(password, user.password);
//   if (validPassword) {
//     return next();
//   }
//   next({ status: 401, message: 'Password is incorrect.' });
// }

// async function createSession(req, res, next) {
//   const { user_id } = res.locals.user;
//   const session = await service.create(user_id);
//   console.log(session);
//   res.status(201).json({ data: session });
// }

// async function checkSession(req, res, next) {
//   const { user_id } = res.locals.user;
//   const session = await service.readFromUser(user_id);
//   if (session) {
//     res.status(409).json({ data: session });
//   }
//   next();
// }

// async function sessionExist(req, res, next) {
//   const { session_id = null } = req.body.data;
//   const session = await service.read(session_id);
//   console.log(session);
//   if (session) {
//     res.locals.session = session;
//     return next();
//   }
//   next({ status: 404, message: `Session: ${session_id} does not exist.` });
// }

async function userExist(req, res, next) {
  const { email } = req.body.data;
  console.log(email);
  const userExist = (await service.read(email)) || null;
  console.log(userExist);
  if (userExist) {
    res.locals.user = userExist;
    return next();
  }
  next({ status: 404, message: 'User not found.' });
}

async function validatePassword(req, res, next) {
  const { password } = req.body.data;
  const { user } = res.locals;
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    return next();
  }
  next({ status: 400, message: 'Password is incorrect' });
}

async function createToken(req, res, next) {
  const { user } = res.locals;
  const { email, user_id } = user;
  const token = jwt.sign({ user_id, email }, process.env.TOKEN_KEY, {
    expiresIn: '2h',
  });
  user.token = token;
  res.status(200).json({ data: user_id, token });
}

async function destroy(req, res, next) {
  const { session_id } = res.locals.session;
  await service.destroy(session_id);
  res.sendStatus(204);
}

module.exports = {
  create: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(VALID_PROPERTIES),
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(validatePassword),
    asyncErrorBoundary(createToken),
  ],
  destroy: [asyncErrorBoundary(destroy)],
};
