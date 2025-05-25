const express = require("express");
const { getRoles, addRole } = require("../../controllers/auth/role");

const router = express.Router();

router.get("/all", getRoles);
router.post("/", addRole);

module.exports = router;
