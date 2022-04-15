const router = require("express").Router();
const controller = require("./posts.controller");
const methodNotAllower = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllower);
router
  .route("/:post_id/comments")
  .get(controller.listComments)
  .all(methodNotAllower);

module.exports = router;
