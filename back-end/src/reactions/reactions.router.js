const router = require('express').Router();
const controller = require('./reactions.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');
router.route('/:user_id').get(controller.read).all(methodNotAllowed);

router
  .route('/:user_id/likes')
  .post(controller.like)
  .delete(controller.destroyLike)
  .all(methodNotAllowed);
router
  .route('/:user_id/special_likes')
  .post(controller.special_like)
  .delete(controller.destroySpecial_like)
  .all(methodNotAllowed);
router
  .route('/:user_id/saves')
  .get(controller.readSaves)
  .post(controller.save)
  .delete(controller.destroySave)
  .all(methodNotAllowed);
router.route('/:post_id/total').get(controller.readTotal).all(methodNotAllowed);
router
  .route('/:user_id/post/:post_id')
  .get(controller.read)
  .all(methodNotAllowed);
module.exports = router;
