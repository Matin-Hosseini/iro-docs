const express = require("express");
const multer = require("multer");

const {
  uploadLoanDocuments,
} = require("../../controllers/loan/loan-documents");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.fields([
    { name: "grade_score_pdf" },
    { name: "job_certificate" },
    { name: "check" },
    { name: "residence" },
  ]),
  uploadLoanDocuments
);

module.exports = router;
