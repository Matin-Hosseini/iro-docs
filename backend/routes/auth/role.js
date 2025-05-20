const express = require("express");
const { getRoles } = require("../../controllers/auth/role");

const router = express.Router();

router.get("/all", getRoles);

module.exports = router;
