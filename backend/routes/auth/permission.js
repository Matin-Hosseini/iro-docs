const express = require("express");
const { addPermission } = require("../../controllers/auth/permission");
const { hasAccessMiddleware } = require("../../middlewares/auth");

const router = express.Router();

router.post("/", hasAccessMiddleware(["permission:create"]), addPermission);

module.exports = router;
