const RolePermissionService = require("../services/role-permission-service");

const rolePermissionService = new RolePermissionService();

class RolePermissionController {
  static async add(req, res) {
    const { roleId } = req.params;
    const { permissionId } = req.body;

    try {
      await rolePermissionService.add({
        roleId,
        permissionId,
      });

      return res.status(200).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async remove(req, res) {
    const { roleId } = req.params;
    const { permissionId } = req.body;

    try {
      await rolePermissionService.remove({
        roleId,
        permissionId,
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = RolePermissionController;
