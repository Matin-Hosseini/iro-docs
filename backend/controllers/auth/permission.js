const PermissionModel = require("./../../models/auth/permission");

const addPermission = async (req, res) => {
  const newPermission = await PermissionModel.create(req.body);

  return res.status(201).json({ msg: "ok", newPermission });
};

module.exports = { addPermission };
