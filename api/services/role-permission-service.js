const database = require("../models");

class RolePermissionService {
  async add(dto) {
    const role = await database.Roles.findByPk(dto.roleId);
    const permission = await database.Permissions.findByPk(dto.permissionId);

    if (!role || !permission) {
      throw new Error("Some data was not found.");
    }

    const existingAssociation = await role.hasPermission(permission);

    if (existingAssociation) {
      throw new Error("Association already exists.");
    }

    await role.addPermission(permission);
  }

  async remove(dto) {
    const role = await database.Roles.findByPk(dto.roleId);
    const permission = await database.Permissions.findByPk(dto.permissionId);

    if (!role || !permission) {
      throw new Error("Some data was not found.");
    }

    await role.removePermission(permission);
  }
}

module.exports = RolePermissionService;
