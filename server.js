const express=require("express");
const userRouter=require("./routers/user")
const postRouter=require("./routers/post");
// const userModel=require("./model/userModel");

const app=express();

//设置cookie
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use((req,res,next)=>{
    res.set("Access-Control-Allow-Origin","*");
    next();
});

app.use("/api",[userRouter,postRouter]);

app.listen(3000);