const userRoleModel = require("./../../models/auth/user-role");

const addRoleToUser = async (req, res) => {
  // const newUserRole = await userRoleModel.create(req.body);

  return res.status(201).json({ msg: "added new role to user" });
};

module.exports = { addRoleToUser };
