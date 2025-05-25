const express = require("express");
const { sendOtp, checkOtp, me } = require("../../controllers/auth/user");
const { authMiddleware } = require("../../middlewares/auth");

const router = express.Router();

router.post("/otp", sendOtp);
router.post("/otp/validate", checkOtp);
router.get("/me", authMiddleware, me);

module.exports = router;
