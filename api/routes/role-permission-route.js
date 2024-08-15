const { Router } = require("express");

const RolePermissionController = require("../controllers/role-permission-controller");

const router = Router();

router
  .post("/:roleId", RolePermissionController.add)
  .delete("/:roleId", RolePermissionController.remove);

module.exports = router;
