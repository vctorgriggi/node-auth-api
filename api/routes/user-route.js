const { Router } = require("express");

const UserController = require("../controllers/user-controller");
const permission = require("../middlewares/permissions");
const auth = require("../middlewares/auth");

const router = Router();

router
  .post("/", UserController.create)
  .get("/", UserController.get)
  .get("/:id", UserController.getById)
  .put("/:id", UserController.updateById)
  .delete(
    "/:id",
    // auth,
    // permission("permission_name_here"),
    UserController.deleteById
  );

module.exports = router;
