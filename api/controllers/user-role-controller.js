const UserRoleService = require("../services/user-role-service");

const userRoleService = new UserRoleService();

class UserRoleController {
  static async add(req, res) {
    const { userId } = req.params;
    const { roleId } = req.body;

    try {
      await userRoleService.add({
        userId,
        roleId,
      });

      return res.status(200).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async remove(req, res) {
    const { userId } = req.params;
    const { roleId } = req.body;

    try {
      await userRoleService.remove({
        userId,
        roleId,
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UserRoleController;
