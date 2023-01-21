var express = require('express');
var router = express.Router();
const { body } = require("express-validator");

const companyController = require('../controllers/companyController')


router.get('/', companyController.index)
router.get('/:id', companyController.show)
router.post('/',[body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อและนามสกุลด้วย"),
                body('salary').not().isEmpty().withMessage("กรุณาใส่ข้อมูลด้วย").isNumeric().withMessage("กรุณาใส่เป็นตัวเลข")], companyController.insert)
router.put('/:id', companyController.update)
router.delete('/:id',[body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อและนามสกุลด้วย")], companyController.destroy)



module.exports = router;

