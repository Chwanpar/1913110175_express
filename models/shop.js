const mongoose=require('mongoose')
const Schema = mongoose.Schema


const staffSchema = new Schema({
    
   name: {type: String,require: true,trim:true},
   photo:{type:String,default:'nopic.png'},
   location:{
    lat: Number,
    lgn:Number
   },
//   createdAt: {type: Date, default:Date.now},
//   updateAt: {type: Date, default:Date.now}
},{
    timestamps:true,
    collection:"shops"
});


const shop = mongoose.model("Shop",staffSchema)

module.exports = shop