var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const { body } = require('express-validator');
const passportJWT =require ('../middleware/passportJWT');

/* GET users listing. */
router.get('/', userController.index);

router.get('/',userController.bio );

router.post('/',[
    body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อและนามสกุลด้วย"),
    body('email').not().isEmpty().withMessage("กรุณาป้อนอีเมลด้วย").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณากรอกรหัสผ่านด้วย").isLength({min: 5}).withMessage("รหัสผ่านต้องมีค่ามากกว่า5ตัวอักษรขึ้นไป")
],userController.register) ;

router.get('/me',[passportJWT.isLogin],userController.profile)


router.post('/log',[
body('email').not().isEmpty().withMessage("กรุณาป้อนอีเมลด้วย").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
body('password').not().isEmpty().withMessage("กรุณากรอกรหัสผ่านด้วย").isLength({min: 5}).withMessage("รหัสผ่านต้องมีค่ามากกว่า5ตัวอักษรขึ้นไป")],userController.log)

module.exports = router;
