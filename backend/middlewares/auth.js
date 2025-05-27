const { validateToken } = require("../utils/funcs/token");
const { getUserAccessData } = require("../utils/funcs/user-access-data");
const UserModel = require("./../models/user");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "token is not provided" });

  const validatedToken = await validateToken(token);

  if (!validatedToken.isValid)
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
  const { user } = req;

  const { roles, permissions: userPermissions } = await getUserAccessData(user);
  console.log(roles);

  const userPermissionNames = userPermissions.map(
    (userPermission) => userPermission.name
  );

  const hasPermission = permissions.every((permission) =>
    userPermissionNames.includes(permission)
  );

  if (!hasPermission)
    return res.status(403).json({ msg: "کاربر دسترسی لازم را ندارد." });

  next();
};

module.exports = { authMiddleware, hasAccessMiddleware };
