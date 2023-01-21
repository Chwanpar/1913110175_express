const { validationResult } = require("express-validator");
const { request } = require("../app");
const User = require("../models/user");
const jwt = require ("jsonwebtoken")

exports.index = function (req, res, next) {
  res.status(200).json({
    fullname: "Chwanpar Kodchavong",
  });
};

exports.bio = function (req, res, next) {
  res.status(200).json({
    fullname: "Chwanpar Kodchavong",
    nickname: "Bam",
    hobby: "play game",
    gitusername: "Chwanpar",
  });
};

exports.register = async (req, res, next) => {
  try{
    const { name, email, password } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      const error = new Error("Data not correct")
      error.statusCode = 422;
      error.validation = errors.array()
      throw error;
    }
    const emails = validationResult(req);
    if (!errors.isEmpty()){
      const error = new Error("Plz input email")
      error.statusCode = 422;
      error.validation = errors.array()
      throw error;
    }



    const existEmail = await User.findOne({email:email})
    if(existEmail){
      const error = new Error("อีเมลนี้มีผู้ใช้งานในระบบแล้ว")
      error.statusCode = 400
      throw error;
    }

   let user = new User();
  user.name = name;
  user.email = email;
  user.password = await user.encryptPassword(password) ;
  await user.save();
  
  res.status(200).json({
    message: "Hello",
  });
  } catch (err) {
    const error =  new Error(`Error: ${e.message}`)
        error.statusCode = 404
        next(error);
  }

  
};

exports.log = async(req,res,next) => {
  try{
    const {  email, password } = req.body;
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      const error = new Error("Data not correct")
      error.statusCode = 422;
      error.validation = errors.array()
      throw error;
    }
    const user = validationResult(req);
    if (!user.isEmpty()){
      const error = new Error("Plz input email")
      error.statusCode = 422;
      error.validation = errors.array()
      throw error;
    }



    const existEmail = await User.findOne({email:email})
    if(!existEmail){
      const error = new Error("ไม่พบผู้ใช้งาน")
      error.statusCode = 404
      throw error;
    }
    const isValid = await existEmail.checkPassword(password)
    if(!isValid){
      const error = new Error("รหัสผ่านไม่ถูกต้อง")
      error.statusCode = 401
      throw error;
    }

  //  let user = new User();
  // user.name = name;
  // user.email = email;
  // user.password = await user.encryptPassword(password) ;
  // await user.save();
  //creat token
const token= await jwt.sign({
  id:user._id,
  role:user.roles,
},"6208796392487EA792A6BE3746DE76EBF732C994E604664FA9AE5F5A10785DDB",{ expiresIn:"5 days"}) 

const expires_in = jwt.decode(token)

  res.status(200).json({
    access_token:token,
    expires_in: expires_in.exp,
    token_type: 'Bearer'
  });
  } catch (error) {
 
        next(error);
  }
};