const UserRoleModel = require("./../../models/auth/user-role");
const RolePermissionModel = require("./../../models/auth/role-permission");
const RoleModel = require("./../../models/auth/role");

const getUserAccessData = async (user) => {
  const userRoles = await UserRoleModel.find({ user_id: user._id });

  const userRoleIDs = userRoles.map((role) => role.role_id);

  const roles = await RoleModel.find({ _id: { $in: userRoleIDs } });

  const rolesPermissions = await RolePermissionModel.find({
    role_id: { $in: userRoleIDs },
  }).populate(["permission_id", "role_id"]);

  const uniquePermissionsMap = new Map();

  for (const perm of rolesPermissions.map((rp) => rp.permission_id)) {
    uniquePermissionsMap.set(perm._id.toString(), perm);
  }

  const userPermissions = Array.from(uniquePermissionsMap.values());

  return {
    roles,
    permissions: userPermissions,
  };
};

module.exports = { getUserAccessData };
