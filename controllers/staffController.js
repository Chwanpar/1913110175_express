const Staff = require('../models/staff')

exports.index = async(req, res, next)=> {


  const staff = await Staff.findOne()
   
    res.status(200).json({
      data: staff

    })
  }

exports.insert = async(req,res,next)=>{

const{name,salary}=req.body

let staff = new staff(req.body);
await staff.save()

  res.status(200).json({
      message:'เพิ่มข้อมูลเรียบร้อยแล้ว',
    })
}
