const { Router } = require("express");

const RoleController = require("../controllers/role-controller");

const router = Router();

router
  .post("/", RoleController.create)
  .get("/", RoleController.get)
  .get("/id/:id", RoleController.getById)
  .put("/id/:id", RoleController.updateById)
  .delete("/id/:id", RoleController.deleteById);

module.exports = router;
