const express = require("express");
const { hasAccessMiddleware } = require("../../middlewares/auth");
const { updateUserInfo } = require("../../controllers/user");
const identityDocumentsRoutes = require("./identity-documents");

const router = express.Router();

router.put("/info", hasAccessMiddleware(["user-info:update"]), updateUserInfo);
router.use("/identity-documents", identityDocumentsRoutes);

module.exports = router;
