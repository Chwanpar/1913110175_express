// var express = require('express');
// var router = express.Router();
// const CompanyController = require('../controllers/CompanyController')
// router.get('/', CompanyController.company);
// module.exports = router;

var express = require('express');
var router = express.Router();

const companyController = require('../controllers/companyController')
const passportJWT = require('../middleware/passportJWT')
const checkAdmin = require('../middleware/checkAdmin')

router.get('/',[passportJWT.islogin], companyController.index)
router.get('/:id', companyController.show)
router.post('/', companyController.insert)
router.put('/:id', companyController.update)
router.delete('/:id', companyController.destroy)

module.exports = router;