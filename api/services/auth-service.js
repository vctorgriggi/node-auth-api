const { sign, verify } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");
const { Op } = require("sequelize");

const jsonSecret = require("../config/jsonSecret");
const MailService = require("./mail-service");
const database = require("../models");

const mailService = new MailService();
let { FRONTEND_URL } = process.env;

class AuthService {
  /* sign in, sign up, sign out */
  async signIn(dto) {
    const user = await database.Users.findOne({
      where: {
        email: { [Op.iLike]: dto.email },
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
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const samePassword = await compare(dto.password, user.passwordHash);

    if (!samePassword) {
      throw new Error("Invalid password.");
    }

    const authToken = sign({ userId: user.id }, jsonSecret.secret, {
      expiresIn: 24 * 60 * 60, // 24 hours
    });

    return { user, authToken };
  }

  /* reset password */
  async forgotPassword(email) {
    const user = await database.Users.findOne({
      where: {
        email: { [Op.iLike]: email },
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const secret = jsonSecret.secret + user.passwordHash;
    const payload = { id: user.id, email: user.email };
    const token = sign(payload, secret, { expiresIn: "15m" });
    const link = `${FRONTEND_URL}/url/${user.id}/${token}`; // exactly the same as the route in the frontend

    try {
      const subject = "Password Reset Request";
      const text = `Access the following link to reset your password: ${link}`;

      await mailService.sendMail(user.email, subject, text);
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async resetPassword(dto) {
    const user = await database.Users.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const secret = jsonSecret.secret + user.passwordHash;

    try {
      const payload = verify(dto.token, secret);

      if (!payload) {
        throw new Error("Invalid or expired token.");
      }

      user.passwordHash = await hash(dto.password, 10);

      await user.save();
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  /* validate token */
  async validateUserToken(userId) {
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
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  async validateResetToken(dto) {
    const user = await database.Users.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const secret = jsonSecret.secret + user.passwordHash;

    try {
      const decoded = verify(dto.token, secret);

      if (!decoded) {
        throw new Error("Invalid or expired token.");
      }
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }
}

module.exports = AuthService;
