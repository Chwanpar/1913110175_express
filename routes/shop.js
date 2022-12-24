var express = require('express');
var router = express.Router();
const { index } = require("../controllers/shopController");

router.get("/", index);

module.exports = router;