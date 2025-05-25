const { validateToken } = require("../utils/funcs/token");
const UserModel = require("./../models/user");
const UserRoleModel = require("./../models/auth/user-role");
const RolePermissionModel = require("./../models/auth/role-permission");
const RoleModel = require("./../models/auth/role");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "token is not provided" });

  const validatedToken = await validateToken(token);

  if (!validatedToken)
    return res.status(400).json({ msg: "token is not valid" });

  const user = await UserModel.findOne({ _id: validatedToken.decoded._id });

  if (!user) return res.status(404).json({ msg: "user not found" });

  if (user.status === "blocked" || user.status === "inactive")
    return res
      .status(403)
      .json({ msg: "شما مجاز به استفاده از سامانه نمی باشید." });

  if (user.status === "waiting")
    return res.status(403).json({
      msg: "در حال حاضر اتصال به سامانه برای شما ممکن نمی باشد. لطفا منتظر بمانید",
    });

  req.user = user;

  next();
};

const hasAccessMiddleware = (permissions) => async (req, res, next) => {
  const user = req.user;

  const userRoles = await UserRoleModel.find({ user_id: user._id });

  const userRoleIDs = userRoles.map((role) => role.role_id);

  const rolePermissions = await RolePermissionModel.find({
    role_id: userRoleIDs[0],
  }).populate(["permission_id", "role_id"]);

  const permissions = await RolePermissionModel.aggregate([
    {
      $match: {
        role_id: { $in: userRoleIDs },
      },
    },
    {
      $lookup: {
        from: "Permissions", // نام collection، نه مدل
        localField: "permission_id",
        foreignField: "_id",
        as: "permission",
      },
    },
    { $unwind: "$permission" },
    {
      $replaceRoot: { newRoot: "$permission" },
    },
    {
      $group: {
        _id: "$_id", // برای حذف تکراری‌ها
        name: { $first: "$name" },
        title: { $first: "$title" },
        description: { $first: "$description" },
      },
    },
  ]);

  res.status(200).json({ permissions });

  console.log(permissions);
  next();
};

module.exports = { authMiddleware, hasAccessMiddleware };
