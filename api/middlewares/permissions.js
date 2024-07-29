const database = require("../models");

/* middleware to check permissions based on user's roles */
module.exports = (permissionName) => {
  return async (req, res, next) => {
    const { userId } = req;

    try {
      const user = await database.Users.findOne({
        where: {
          id: userId,
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
                where: {
                  name: permissionName,
                },
                through: { attributes: [] },
              },
            ],
          },
        ],
      });

      if (user && user.roles.some((role) => role.permissions.length > 0)) {
        return next();
      }

      return res.status(403).send({
        message: "Authentication refused! Unauthorized action.",
      });
    } catch (error) {
      console.error("Error while checking permissions:", error.stack);
      return res
        .status(500)
        .send({ message: "There was an error while checking permissions." });
    }
  };
};
