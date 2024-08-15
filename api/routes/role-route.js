const { Router } = require("express");

const RoleController = require("../controllers/role-controller");

const router = Router();

router
  .post("/", RoleController.create)
  .get("/", RoleController.get)
  .get("/:id", RoleController.getById)
  .put("/:id", RoleController.updateById)
  .delete("/:id", RoleController.deleteById);

module.exports = router;
