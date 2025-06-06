const express = require("express");

const router = express.Router();

const userRoutes = require("./user/index");
const roleRoutes = require("./auth/role");
const documentRoutes = require("./documents/upload");
const authUserRoutes = require("./auth/user");
const permissionRoutes = require("./auth/permission");
const rolePermissionRoutes = require("./auth/role-permission");
const userRoleRoutes = require("./auth/user-role");
const loanRoutes = require("./loan/index");
const { authMiddleware } = require("../middlewares/auth");

router.use("/user", authMiddleware, userRoutes);
router.use("/role", authMiddleware, roleRoutes);
router.use("/document", authMiddleware, documentRoutes);
router.use("/auth", authUserRoutes);
router.use("/permission", authMiddleware, permissionRoutes);
router.use("/role-permission", authMiddleware, rolePermissionRoutes);
router.use("/user-role", authMiddleware, userRoleRoutes);
router.use("/loan", authMiddleware, loanRoutes);

module.exports = router;
