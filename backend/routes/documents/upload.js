const express = require("express");
const {
  uploadSingle,
  downloadFile,
  userDocuments,
} = require("../../controllers/documents/document");

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("file"), uploadSingle);
router.get("/download", downloadFile);
router.get("/docs", userDocuments);

module.exports = router;
