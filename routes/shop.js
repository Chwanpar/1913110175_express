var express = require('express');
var router = express.Router();
const shopController = require("../controllers/shopController");

router.get("/", shopController.Shop);
router.get("/menu", shopController.menu);
router.get('/:id', shopController.show)

module.exports = router;