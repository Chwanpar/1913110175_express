const mongoose=require('mongoose')
const schema = mongoose.Schema


const Schema = new Schema({
    
   name: {type: String,require: true,trim:true},
   price:{type:Number, default: 100},
   shop: {type: Schema.Types.OpjectId, ref:'Shops'}
  
//   createdAt: {type: Date, default:Date.now},
//   updateAt: {type: Date, default:Date.now}
},{
    timestamps:true,
    collection:"menus"
});


const shop = mongoose.model("Menu",Schema)

module.exports = menu