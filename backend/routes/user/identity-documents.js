const express = require("express");
const {
  uploadIdentityDocuments,
  getIdentityDocuments,
} = require("../../controllers/user/identity-documents");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "birth_certificate_first_page" },
    { name: "birth_certificate_second_page" },
    { name: "national_card_front" },
    { name: "national_card_back" },
  ]),
  uploadIdentityDocuments
);

router.get("/", getIdentityDocuments);

module.exports = router;
