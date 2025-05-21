const express = require("express");

const router = express.Router();

const userRoutes = require("./user");
const roleRoutes = require("./auth/role");
const documentRoutes = require("./documents/upload");
const authUserRoutes = require("./auth/user");

router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/document", documentRoutes);
router.use("/auth", authUserRoutes);

module.exports = router;
