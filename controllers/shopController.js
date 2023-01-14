const { config } = require("dotenv");
const Shop  = require("../models/shop");
const con = require("../config");

const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

exports.Shop = async (req, res, next) => {
  const shops = await Shop.find().select('name photo location').sort({_id:-1});
const shopwithPhotoDomain = shops.map((shop,index) => {
    return{
        id: shop._id,
        name: shop.name,
        photo: `${con.DOMAIN}${shop.photo}`,
        location: shop.location

    }
})

  res.status(200).json({ data: shopwithPhotoDomain });
};

exports.menu = async (req , res) => {
    // const shop = await Menu.find()
    //   .select('name price')
    //   .populate('shop', 'name')
    //   .sort({ _id: -1 });
    const menu = await menu.find()
    .populate('shop')
    res.send({
      data: menu,
    });}

    exports.insert = async (req, res) => {
      // add data to database
      const { name, location,photo } = req.body
      const shop = new Shop({ name,location,photo })
      await shop.save()
      res.status(201).json({ message: 'staff added successfully' })
      try {
        const { name, location,photo } = req.body
        const shop = new Shop({ name, location ,photo})
        await shop.save()
        res.status(201).json({ message: 'staff added successfully' })
      } catch (err) {
        const error =  new Error(`Error: ${e.message}`)
        error.statusCode = 404
        next(error);
      }
    }

    exports.show = async (req, res) => {
        try {
          const shop = await shop.findById(req.params.id).populate('menus')
          if (!shop) throw new Error('ไม่พบข้อมูล')
          res.send({ data: shop })
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
