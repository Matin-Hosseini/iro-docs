const express = require("express");
const { getUserLoanInfo } = require("../../controllers/loan/user-loan");

const router = express.Router();

router.post("/", getUserLoanInfo);

module.exports = router;
