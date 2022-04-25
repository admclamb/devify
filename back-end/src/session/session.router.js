const router = require('express').Router();
const controller = require('./session.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/')
  .post(controller.create)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;
