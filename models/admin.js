const mongoose=require('mongoose');

const adminschema=new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})
const admin_model=mongoose.model('admin',adminschema,'admin');
module.exports=admin_model;