const router = require('express').Router();
const controller = require('./images.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/avatar').post(controller.create).all(methodNotAllowed);

module.exports = router;
