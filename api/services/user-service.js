const { v4: uuidv4 } = require("uuid");
const { hash } = require("bcryptjs");
const { Op } = require("sequelize");

const validateIdentity = require("../utils/identity-validator");
const database = require("../models");

class UserService {
  async create(dto) {
    if (!validateIdentity(dto.identity)) {
      throw new Error("Invalid identity.");
    }

    const userByEmailOrIdentity = await database.Users.findOne({
      where: {
        [Op.or]: [
          { email: { [Op.iLike]: dto.email } },
          { identity: { [Op.iLike]: dto.identity } },
        ],
      },
    });

    if (userByEmailOrIdentity) {
      throw new Error("There is already a user with this email or identity.");
    }

    try {
      const newUser = await database.Users.create({
        id: uuidv4(),
        name: dto.name,
        email: dto.email,
        identity: dto.identity,
        passwordHash: await hash(dto.password, 10),
      });

      return newUser;
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async get() {
    const users = await database.Users.findAll();

    return users;
  }

  async getById(id) {
    const user = await database.Users.findOne({
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

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  async updateById(dto) {
    if (!validateIdentity(dto.identity)) {
      throw new Error("Invalid identity.");
    }

    const user = await database.Users.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const userByEmailOrIdentity = await database.Users.findOne({
      where: {
        [Op.or]: [
          { email: { [Op.iLike]: dto.email } },
          { identity: { [Op.iLike]: dto.identity } },
        ],
        id: { [Op.ne]: dto.id },
      },
    });

    if (userByEmailOrIdentity) {
      throw new Error("There is already a user with this email or identity.");
    }

    try {
      user.name = dto.name;
      user.email = dto.email;
      user.identity = dto.identity;
      user.passwordHash = await hash(dto.password, 10);

      await user.save();

      return await user.reload();
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async deleteById(id) {
    const user = await database.Users.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    try {
      await database.Users.destroy({
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

module.exports = UserService;
