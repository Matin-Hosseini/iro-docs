const express = require("express");
const { addRoleToUser } = require("../../controllers/auth/user-role");
const {
  authMiddleware,
  hasAccessMiddleware,
} = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  hasAccessMiddleware(["user-form:update"]),
  addRoleToUser
);

module.exports = router;
