const router = require('express').Router();

const controller = require('./search.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/:type').get(controller.listSearch).all(methodNotAllowed);

module.exports = router;
