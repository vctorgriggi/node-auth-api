const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const database = require("../models");

class PermissionService {
  async create(dto) {
    const byName = await database.Permissions.findOne({
      where: {
        name: { [Op.iLike]: dto.name },
      },
    });

    if (byName) {
      throw new Error("There is already a permission with this name.");
    }

    try {
      const newPermission = await database.Permissions.create({
        id: uuidv4(),
        name: dto.name,
      });

      return newPermission;
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async get() {
    const permissions = await database.Permissions.findAll();

    return permissions;
  }

  async getById(id) {
    const permission = await database.Permissions.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: database.Roles,
          as: "roles",
          through: { attributes: [] },
        },
      ],
    });

    if (!permission) {
      throw new Error("Permission not found.");
    }

    return permission;
  }

  async updateById(dto) {
    const permission = await database.Permissions.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!permission) {
      throw new Error("Permission not found.");
    }

    const byName = await database.Permissions.findOne({
      where: {
        name: { [Op.iLike]: dto.name },
        id: { [Op.ne]: dto.id },
      },
    });

    if (byName) {
      throw new Error("There is already a permission with this name.");
    }

    try {
      permission.name = dto.name;

      await permission.save();

      return await permission.reload();
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async deleteById(id) {
    const permission = await database.Permissions.findOne({
      where: {
        id: id,
      },
    });

    if (!permission) {
      throw new Error("Permission not found.");
    }

    try {
      await database.Permissions.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }
}

module.exports = PermissionService;
