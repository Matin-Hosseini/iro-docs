const express = require("express");
const {
  addRolePermission,
  getRolePermissions,
} = require("../../controllers/auth/role-permission");
const { hasAccessMiddleware } = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/",
  hasAccessMiddleware(["role-permission:create"]),
  addRolePermission
);
router.get("/", getRolePermissions);

module.exports = router;
