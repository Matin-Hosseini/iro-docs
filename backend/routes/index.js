const express = require("express");

const router = express.Router();

const userRoutes = require("./user");
const roleRoutes = require("./auth/role");
const documentRoutes = require("./documents/upload");
const authUserRoutes = require("./auth/user");
const permissionRoutes = require("./auth/permission");
const rolePermissionRoutes = require("./auth/role-permission");
const userRoleRoutes = require("./auth/user-role");

router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/document", documentRoutes);
router.use("/auth", authUserRoutes);
router.use("/permission", permissionRoutes);
router.use("/role-permission", rolePermissionRoutes);
router.use("/user-role", userRoleRoutes);

module.exports = router;
