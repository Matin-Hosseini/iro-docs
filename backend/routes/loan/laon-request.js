const express = require("express");
const { newLoanRequest } = require("../../controllers/loan/loan-request");
const { getUserRequestedLoans } = require("../../controllers/loan/user-loan");

const router = express.Router();

router.post("/", newLoanRequest);
router.get("/all", getUserRequestedLoans);

module.exports = router;
