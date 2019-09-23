const express=require("express");
const userRouter=require("./routers/user")
const userModel=require("./model/userModel");

const app=express();

//设置cookie
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use("/api",userRouter);

app.listen(3000);