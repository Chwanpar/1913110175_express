const Shop  = require("../models/shop");

exports.Shop = async (req, res, next) => {
  const shops = await Shop.find().select('name photo location').sort({_id:-1});
const shopwithPhotoDomain = shops.map((shop,index) => {
    return{
        id: shop._id,
        name: shop.name,
        photo: 'http://localhost:3000/images/' + shop.photo,
        location: shop.location

    }
})

  res.status(200).json({ data: shopwithPhotoDomain });
};

exports.menu = async (req , res) => {
    const shop = await Menu.find()
      .select('name price')
      .populate('shop', 'name')
      .sort({ _id: -1 });
    res.send({
      data: shop,
    });}
