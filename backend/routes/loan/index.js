const express = require("express");

const router = express.Router();

const loanRequestRoutes = require("./laon-request");
const loanDocumentsRoutes = require("./loan-documents");
const loanInfoRoutes = require("./info");

router.use("/request", loanRequestRoutes);
router.use("/documents", loanDocumentsRoutes);
router.use("/info", loanInfoRoutes);

module.exports = router;
