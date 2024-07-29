const { Router } = require("express");

const UserRoleController = require("../controllers/user-role-controller");

const router = Router();

router
  .post("/user-id/:userId", UserRoleController.add)
  .delete("/user-id/:userId", UserRoleController.remove);

module.exports = router;
