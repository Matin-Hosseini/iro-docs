const RoleModel = require("./../../models/auth/role");

const getRoles = async (req, res) => {
  const roles = await RoleModel.find();

  res.status(200).json({ roles });
};

const addRole = async(req, res) => {

}

module.exports = { getRoles };
