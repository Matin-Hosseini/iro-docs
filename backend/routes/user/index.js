const express = require("express");
const { hasAccessMiddleware } = require("../../middlewares/auth");
const { updateUserInfo } = require("../../controllers/user");

const router = express.Router();

router.put("/info", hasAccessMiddleware(["user-info:update"]), updateUserInfo);

module.exports = router;
