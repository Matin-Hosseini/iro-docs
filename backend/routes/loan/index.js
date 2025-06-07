const express = require("express");

const router = express.Router();

const loanRequestRoutes = require("./laon-request");
const loanDocumentsRoutes = require("./loan-documents");

router.use("/request", loanRequestRoutes);
router.use("/documents", loanDocumentsRoutes);

module.exports = router;
