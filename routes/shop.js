var express = require('express');
var router = express.Router();
const shopController = require("../controllers/shopController");
const { body } = require("express-validator");

router.get("/", shopController.Shop);
router.get("/menu", shopController.menu);
router.get('/:id', shopController.show);
router.post("/",[body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อร้านด้วย"),
                body('location').not().isEmpty().withMessage("กรุณาป้อนสถานที่ด้วย")], shopController.insert);

module.exports = router;