const PermissionService = require("../services/permission-service");

const permissionService = new PermissionService();

class PermissionController {
  static async create(req, res) {
    const { name } = req.body;

    try {
      await permissionService.create({
        name,
      });

      return res.status(201).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const permissions = await permissionService.get();

      return res.status(200).json(permissions);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const permission = await permissionService.getById(id);

      return res.status(200).json(permission);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const permission = await permissionService.updateById({
        id,
        name,
      });

      return res.status(200).json(permission);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await permissionService.deleteById(id);

      return res.status(204).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = PermissionController;
