const { Router } = require("express");

const UserRoleController = require("../controllers/user-role-controller");

const router = Router();

router
  .post("/:userId", UserRoleController.add)
  .delete("/:userId", UserRoleController.remove);

module.exports = router;
