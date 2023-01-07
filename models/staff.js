// const mongoose=require('mongoose');
// const Schema = mongoose.Schema


// const staffSchema = new Schema({
    
//   name: {type: String,require: true,trim:true},
//   salary: {type: Number},
//   created: {type: Date, default:Date.now}
 
// },{collection:"staffs"});


// const staff = mongoose.model("Staff",staffSchema)

// module.exports = staff


const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController')

router.get('/', staffController.index)
router.get('/:id', staffController.show)
router.post('/', staffController.insert)
router.put('/:id', staffController.update)
router.delete('/:id', staffController.destroy)

module.exports = router
