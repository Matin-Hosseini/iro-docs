const express = require("express");

const router = express.Router();

const userRoutes = require("./user");
const roleRoutes = require("./auth/role");

router.use("/user", userRoutes);
router.use("/role", roleRoutes);

module.exports = router;
