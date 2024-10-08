const database = require("../models");

class UserRoleService {
  async add(dto) {
    const user = await database.Users.findByPk(dto.userId);
    const role = await database.Roles.findByPk(dto.roleId);

    if (!user || !role) {
      throw new Error("Some data was not found.");
    }

    const hasAssociation = await user.hasRole(role);

    if (hasAssociation) {
      throw new Error("Association already exists.");
    }

    await user.addRole(role);
  }

  async remove(dto) {
    const user = await database.Users.findByPk(dto.userId);
    const role = await database.Roles.findByPk(dto.roleId);

    if (!user || !role) {
      throw new Error("Some data was not found.");
    }

    await user.removeRole(role);
  }
}

module.exports = UserRoleService;
