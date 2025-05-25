const express = require("express");
const {
  addRolePermission,
  getRolePermissions,
} = require("../../controllers/auth/role-permission");

const router = express.Router();

router.post("/", addRolePermission);
router.get("/", getRolePermissions);


module.exports = router;
