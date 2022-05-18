const router = require('express').Router();

const controller = require('./search.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/:type').put(controller.listSearch).all(methodNotAllowed);

module.exports = router;
