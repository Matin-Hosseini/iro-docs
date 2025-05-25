const express = require("express");
const { addPermission } = require("../../controllers/auth/permission");

const router = express.Router();

router.post("/", addPermission);

module.exports = router;
