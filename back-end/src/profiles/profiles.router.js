const router = require('express').Router();
const controller = require('./profiles.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/:user_id/stats').get(controller.readStats).all(methodNotAllowed);
router.route('/:user_id').get(controller.read).all(methodNotAllowed);
module.exports = router;
