// const Staff = require('../models/staff')

// exports.index = async(req, res, next)=> {


//   const staff = await Staff.findOne()
   
//     res.status(200).json({
//       data: staff

//     })
//   }

// exports.insert = async(req,res,next)=>{

// const{name,salary}=req.body

// let staff = new staff(req.body);
// await staff.save()

//   res.status(200).json({
//       message:'เพิ่มข้อมูลเรียบร้อยแล้ว',
//     })
// }

const Staff = require('../models/staff')
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const config = require('../config/index');



exports.index = async (req, res) => {
  const staffs = await Staff.find()
  const staff = await Staff.find().sort({ _id: '1' })
  const staffWithPhotoDomain = staff.map((staff) => {
    return {
      id: staff._id,
      name: staff.name,
      salary: staff.salary,
      photo: `${config.DOMAIN}images/${staff.photo}`
    }
  })
  res.send({ data: staffWithPhotoDomain })
}

exports.show = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id)
    if (!staff) throw new Error('staff not found')
    res.send({ data: staff })
  } catch (err) {
    const error =  new Error(`Error: ${e.message}`)
    error.statusCode = 404
    next(error);
  }
}

exports.insert = async (req, res) => {
  // add data to database
  const { name, salary, photo } = req.body
  const staff = new Staff({ name, salary, photo: photo && (await saveImageToDisk(photo)) })
  await staff.save()
  res.status(201).json({ message: 'staff added successfully' })
  try {
    const { name, salary, photo } = req.body
    const staff = await Staff.updateOne(
      { _id: id },
      { name, salary, photo: photo && (await saveImageToDisk(photo)) }
    )
    await staff.save()
    res.status(201).json({ message: 'staff added successfully' })
  }catch (err) {
    const error =  new Error(`Error: ${e.message}`)
    error.statusCode = 404
    next(error);
  }
}

exports.update = async (req, res) => {
  try {
    const { id } = req.params
    const { name, salary } = req.body
    const staff = await Staff.updateOne({ _id: id }, { name, salary })
    if (staff.matchedCount === 0) throw new Error('staff not found')
    res.status(200).json({ message: 'staff updated successfully' })
  } catch (err) {
    const error =  new Error(`Error: ${e.message}`)
        error.statusCode = 404
        next(error);
  }
}

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params
    const staff = await Staff.deleteOne({ _id: id })
    if (staff.deletedCount === 0) throw new Error('staff not found')
    res.status(200).json({ message: 'staff deleted successfully' })
  } catch (err) {
    const error =  new Error(`Error: ${e.message}`)
        error.statusCode = 404
        next(error);
  }
}

async function saveImageToDisk(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = path.resolve('./') ;
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/public/images/`;

  //หานามสกุลไฟล์
  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = '';
  if (ext === 'svg+xml') {
      filename = `${uuidv4.v4()}.svg`;
  } else {
      filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  //เขียนไฟล์ไปไว้ที่ path
  await writeFileAsync(uploadPath+filename, image.data, 'base64');
  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}