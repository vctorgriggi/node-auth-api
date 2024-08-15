const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const database = require("../models");

class RoleService {
  async create(dto) {
    const roleByName = await database.Roles.findOne({
      where: {
        name: { [Op.iLike]: dto.name },
      },
    });

    if (roleByName) {
      throw new Error("There is already a role with this name.");
    }

    try {
      const newRole = await database.Roles.create({
        id: uuidv4(),
        name: dto.name,
        description: dto.description,
      });

      return newRole;
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async get() {
    const roles = await database.Roles.findAll();

    return roles;
  }

  async getById(id) {
    const role = await database.Roles.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: database.Users,
          as: "users",
          through: { attributes: [] },
        },
        {
          model: database.Permissions,
          as: "permissions",
          through: { attributes: [] },
        },
      ],
    });

    if (!role) {
      throw new Error("Role not found.");
    }

    return role;
  }

  async updateById(dto) {
    const role = await database.Roles.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!role) {
      throw new Error("Role not found.");
    }

    const roleByName = await database.Roles.findOne({
      where: {
        name: { [Op.iLike]: dto.name },
        id: { [Op.ne]: dto.id },
      },
    });

    if (roleByName) {
      throw new Error("There is already a role with this name.");
    }

    try {
      role.name = dto.name;
      role.description = dto.description;

      await role.save();

      return await role.reload();
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async deleteById(id) {
    const role = await database.Roles.findOne({
      where: {
        id: id,
      },
    });

    if (!role) {
      throw new Error("Role not found.");
    }

    try {
      await database.Roles.destroy({
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

module.exports = RoleService;
