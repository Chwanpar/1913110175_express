exports.index = function(req,res,next){
    res.status(200).json({
        fullname: 'Chwanpar Kodchavong'
      })
    
}

exports.bio = function(req, res, next) {
   
    res.status(200).json({
      fullname: 'Chwanpar Kodchavong',
      nickname: 'Bam',
      hobby: 'play game',
      gitusername: 'Chwanpar'
    })
  }
  