const express = require("express");
const { getLoanInfo } = require("../../controllers/loan/info");

const router = express.Router();

router.get("/:tracking_code", getLoanInfo);

module.exports = router;
