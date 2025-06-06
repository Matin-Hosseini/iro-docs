const express = require("express");
const { newLoanRequest } = require("../../controllers/loan/loan-request");

const router = express.Router();

router.post("/", newLoanRequest);

module.exports = router;
