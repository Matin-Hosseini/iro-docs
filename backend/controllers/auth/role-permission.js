const RolePermissionModel = require("./../../models/auth/role-permission");
const RoleModel = require("./../../models/auth/role");
const PermissionModel = require("./../../models/auth/permission");

const addRolePermission = async (req, res) => {
  const newRolePermission = await RolePermissionModel.create(req.body);

  return res.status(201).json({ msg: "ok", newRolePermission });
};

const getRolePermissions = async (req, res) => {
  const populatedPermissions = await RolePermissionModel.find({
    role_id: req.body.role_id,
  }).populate(["permission_id"]);

  const permissions = populatedPermissions.map((perm) => ({
    _id: perm.permission_id._id,
    name: perm.permission_id.name,
    title: perm.permission_id.title,
  }));

  return res.status(200).json({ msg: "ok", permissions });
};

module.exports = { addRolePermission, getRolePermissions };
