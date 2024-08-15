const { Router } = require("express");

const PermissionController = require("../controllers/permission-controller");

const router = Router();

router
  .post("/", PermissionController.create)
  .get("/", PermissionController.get)
  .get("/:id", PermissionController.getById)
  .put("/:id", PermissionController.updateById)
  .delete("/:id", PermissionController.deleteById);

module.exports = router;
