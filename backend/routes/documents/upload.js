const express = require("express");
const {
  uploadSingle,
  downloadFile,
  userDocuments,
} = require("../../controllers/documents/document");

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post(
  "/upload",
  upload.fields([
    { name: "birth_certificate_first_page" },
    { name: "birth_certificate_second_page" },
    { name: "national_card_front" },
    { name: "national_card_back" },
    { name: "job_certificate" },
    { name: "credit_score" },
  ]),
  uploadSingle
);
router.get("/download", downloadFile);
router.get("/docs", userDocuments);

module.exports = router;
