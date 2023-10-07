const express = require("express");
const { test } = require("../controllers/userController.js");

const router = express.Router();

router.get('/', test);

module.exports = router;