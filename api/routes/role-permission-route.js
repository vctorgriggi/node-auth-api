const { Router } = require("express");

const RolePermissionController = require("../controllers/role-permission-controller");

const router = Router();

router
  .post("/role-id/:roleId", RolePermissionController.add)
  .delete("/role-id/:roleId", RolePermissionController.remove);

module.exports = router;
