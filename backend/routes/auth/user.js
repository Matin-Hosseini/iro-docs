const express = require("express");
const { sendOtp, checkOtp } = require("../../controllers/auth/user");

const router = express.Router();

router.post("/otp", sendOtp);
router.post("/otp/validate", checkOtp);

module.exports = router;
