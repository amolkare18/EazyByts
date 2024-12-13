const mongoose=require('mongoose');

const skillschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
});
const skill_model=mongoose.model("skill",skillschema,"skill");
module.exports=skill_model;