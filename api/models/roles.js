"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.belongsToMany(models.Users, {
        through: models.UsersRoles,
        as: "users",
        foreignKey: "roleId",
      });
      Roles.belongsToMany(models.Permissions, {
        through: models.RolesPermissions,
        as: "permissions",
        foreignKey: "roleId",
      });
    }
  }
  Roles.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Roles",
    }
  );
  return Roles;
};
