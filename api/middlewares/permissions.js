const database = require("../models");

/* middleware to check permissions based on user's roles */
const checkPermissions = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = await database.Users.findOne({
        where: {
          id: req.userId,
        },
        include: [
          {
            model: database.Roles,
            as: "roles",
            through: { attributes: [] },
            include: [
              {
                model: database.Permissions,
                as: "permissions",
                where: { name: permissionName }, // check for specific permission
                through: { attributes: [] },
              },
            ],
          },
        ],
      });

      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      const hasPermission = user.roles.some(
        (role) => role.permissions.length > 0
      );

      if (hasPermission) {
        return next();
      } else {
        return res
          .status(403)
          .send({ message: "Authentication refused! Unauthorized action." });
      }
    } catch (error) {
      console.error("An issue arose while validating permissions", error.stack);
      return res.status(500).send({
        message:
          "Unable to verify permissions due to a server error. Please try again or contact support.",
      });
    }
  };
};

module.exports = checkPermissions;
