const mongoose=require("../config/db");
const schema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    picture:{
        type:String,
        default:"http://localhost:3000/images/hello.jpg"
    }
});
const model=mongoose.model("user",schema);
module.exports=model;