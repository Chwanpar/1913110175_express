const company = require('../models/company')

exports.company = async(req, res, next)=> {


  const company = await company.findOne()
   
    res.status(200).json({
      data: company

    })
  }