const express=require("express");
const router=express.Router();
const userModel=require("../model/userModel");
const bcryptjs=require("bcryptjs");
router.post("/sign-up",async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    let email=req.body.email;
    let data =await userModel.findOne({email:email});
    if(data){//因为是前后端的数据，所以得告诉前端是json的数据
        res.send({
            code:-1,
            msg:"邮箱已被注册",
        });
        return;
    }
    let user=new userModel({
        username:username,
        password:bcryptjs.hashSync(password,10),
        email:email,
    });
    await user.save();
   res.send({
       code:0,
       masg:"注册成功",
   })
});
router.post("/sign-in",(req,res)=>{
    res.send("登陆成功");
})
module.exports=router;
