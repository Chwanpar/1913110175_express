var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('Eiei');
  res.status(200).json({
    fullname: 'Chwanpar Kodchavong'
  })
});


router.get('/bio', function(req, res, next) {
  //res.send('Eiei');
  res.status(200).json({
    fullname: 'Chwanpar Kodchavong',
    nickname: 'Bam',
    hobby: 'play game',
    gitusername: 'Chwanpar'
  })
});



module.exports = router;
