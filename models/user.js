const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
   name:{ type:String, required:true},
   username:{ type:String, required:true, unique:true},
   password:{ type:String, required:true},
   email:{ type:String, required:true, unique:true},
   phone:{ type:Number,required:true},
   gender:{type:String,required:true},
},
 {timestamp:true}
);

const User= mongoose.model('user',userSchema);

module.exports= User;