const express = require("express");

const router = express.Router();

const loanRequestRoutes = require("./laon-request");

router.use("/request", loanRequestRoutes);

module.exports = router;
