const router = require("express").Router();
const controller = require("./posts.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);
router.route("/:post_id").get(controller.read).all(methodNotAllowed);
router
  .route("/:post_id/comments")
  .get(controller.listComments)
  .all(methodNotAllowed);

module.exports = router;
