const express = require("express");

const userRouter = require("./user-route");
const roleRouter = require("./role-route");
const permissionRouter = require("./permission-route");
const authRouter = require("./auth-route");
const userRoleRouter = require("./user-role-route");
const rolePermissionRouter = require("./role-permission-route");

const router = express.Router();

router
  .use("/user", userRouter)
  .use("/role", roleRouter)
  .use("/permission", permissionRouter)
  .use("/auth", authRouter)
  .use("/ur", userRoleRouter)
  .use("/rp", rolePermissionRouter);

module.exports = router;
