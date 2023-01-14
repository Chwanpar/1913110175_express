const User = require("../models/user");

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
  const { name, email, password } = req.body;
  let user = new User();
  user.name = name;
  user.email = email;
  user.password = await user.encryptPassword(password) ;
  await user.save();
  
  res.status(200).json({
    message: "Hello",
  });
};
