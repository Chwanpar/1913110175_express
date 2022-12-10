var express = require('express');
var router = express.Router();
const StaffController = require('../controllers/staffController')
router.get('/',StaffController.index);
router.post('/',StaffController.insert);
module.exports = router;