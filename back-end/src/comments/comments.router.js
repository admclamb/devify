const router = require('express').Router();
const controller = require('./comments.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .delete(controller.destroy)
  .all(methodNotAllowed);
router.route('/post/:post_id').get(controller.listForPost);

module.exports = router;
