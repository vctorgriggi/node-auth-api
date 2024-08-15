const RoleService = require("../services/role-service");

const roleService = new RoleService();

class RoleController {
  static async create(req, res) {
    const { name, description } = req.body;

    try {
      await roleService.create({
        name,
        description,
      });

      return res.status(201).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const roles = await roleService.get();

      return res.status(200).json(roles);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const role = await roleService.getById(id);

      return res.status(200).json(role);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const role = await roleService.updateById({
        id,
        name,
        description,
      });

      return res.status(200).json(role);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await roleService.deleteById(id);

      return res.status(204).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = RoleController;
