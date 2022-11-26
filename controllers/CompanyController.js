exports.company = function(req, res, next) {
   
    res.status(200).json({
      data :[{
         id:1,
      name:'Advice',
      address:{
      provnice:'Bangkok',
      postcode:'10310'
      }
    },
    {
        id:1,
     name:'Advice',
     address:{
     provnice:'Bangkok',
     postcode:'10310'
     }
   },
   {
    id:1,
 name:'Advice',
 address:{
 provnice:'Bangkok',
 postcode:'10310'
 }
}]

    

    })
  }