const mongoose=require('mongoose');

const projectschema=new mongoose.Schema({
tittle:{
    type:String,
    required:true,
},
skills:{
    type:[String],
    default:[],

},
img:{
    type:String,
    required:true,
},
link:{
    type:String,
    required:true
},


});

const project_model=mongoose.model("project",projectschema,"project");
module.exports=project_model;