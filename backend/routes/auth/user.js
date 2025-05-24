const express = require("express");
const { sendOtp, checkOtp, me } = require("../../controllers/auth/user");

const router = express.Router();

router.post("/otp", sendOtp);
router.post("/otp/validate", checkOtp);
router.get("/me", me);

module.exports = router;
