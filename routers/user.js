const express=require("express");
const bcryptjs=require("bcryptjs");
const userModel=require("../model/userModel");
const jwt=require("jsonwebtoken");
const router=express.Router();
router.post("/sign-up",async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    let email=req.body.email;
    console.log(email);
    let data =await userModel.findOne({email:email});
    console.log(data)
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
       msg:"注册成功",
   });
//    console.log();
});
router.post("/sign-in",async(req,res)=>{
    // res.send("登陆成功");
    let email=req.body.email;
    let password=req.body.password;
    // console.log(email);
    // let i=await userModel.findOne({email:"lm@qq.com"});
    // console.log(i);
    let user=await userModel.findOne({email:email});
    console.log(user);
    if(!user){
        res.send({
            code:-1,
            msg:"该用户名不存在",
        });
        return;
    }
    let isok=bcryptjs.compareSync(password,user.password);
    if(!isok){
        res.send({
            code:-1,
            msg:"邮箱或者密码有误",
        });
        return;
    };
   let token= jwt.sign(
        {
        id:user.id,
        username:user.uername,
        email:email,
        },
        "hello",
    )
    res.send({
        code:0,
        msg:"登录成功",
        data:{
            user:{
                username:user.username,
                password:user.password,
                id:user._id,
            },
            token:token,
        }
       
    });


})
module.exports=router;
