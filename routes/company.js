var express = require('express');
var router = express.Router();
const CompanyController = require('../controllers/CompanyController')
router.get('/', CompanyController.company);
module.exports = router;