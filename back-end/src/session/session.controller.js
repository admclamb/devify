const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./session.service');
const bcrypt = require('bcryptjs');
const SALT = 10;
function checkLogin(req, res, next) {
  // if (session.user_id) {
  //   return next();
  // }
  next({
    status: 401,
    message: 'Unauthorized. authentication has failed or not yet been proven',
  });
}

async function validateLogin(req, res, next) {
  const { username = null } = req.body.data;
  const { password = null } = req.body.data;
  if (!username || !password) {
    return next({ status: 400, message: 'username or password is missing' });
  }
  const user = await service.readUser(username);
  if (user) {
    res.locals.user = user;
    return next();
  }
  next({ status: 404, message: `Customer: ${username} does not exist` });
}

async function validatePassword(req, res, next) {
  const { password = '' } = req.body.data;
  const { user = {} } = res.locals;
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    return next();
  }
  next({ status: 401, message: 'Invalid password' });
}

async function createSession(req, res, next) {
  const { user_id } = res.locals.user;
  const session = await service.create(user_id);
  res.status(201).json({ data: session });
}

async function sessionExist(req, res, next) {
  const { session_id = null } = req.body.data;
  const session = await service.read(session_id);
  if (session) {
    res.locals.session = session;
    return next();
  }
  next({ status: 404, message: `Session: ${session_id} does not exist` });
}

async function destroy(req, res, next) {
  const { session_id } = res.locals.session;
  await service.destroy(session_id);
  res.sendStatus(204);
}

module.exports = {
  create: [
    asyncErrorBoundary(validateLogin),
    asyncErrorBoundary(validatePassword),
    asyncErrorBoundary(createSession),
  ],
  destroy: [asyncErrorBoundary(sessionExist), asyncErrorBoundary(destroy)],
};
