const router = require('express').Router();
const controller = require('./images.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/').get(controller.get).all(methodNotAllowed);
router.route('/avatar/:user_id').post(controller.update).all(methodNotAllowed);

module.exports = router;
