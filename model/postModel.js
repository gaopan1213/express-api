const mongoose=require("../config/db");
const schema=new mongoose.Schema(
    {
    title:String,
    content:String,
    },
    {
        timestamps:true,
    }
);
let model=mongoose.model("post",schema);
module.exports=model;