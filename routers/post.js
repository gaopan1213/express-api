const express=require("express");
const touter=express.Router();
const auth=require("../middleware/auth");
const postModel=require("../model/postModel");
touter.get("/posts",auth(),async(req,res)=>{
    let pageNUm=parseInt(req.query.pageNUm)||1;
    let pageSize=parseInt(req.query.pageSize)||5;
    let list= await postModel.find().sort({updatedAt:-1}).skip(pageSize*(pageNUm-1)).limit(pageSize);
    let totalNum=await postModel.find().estimatedDocumentCount();
    let total=Math.ceil(totalNum/pageSize);
    // console.log(totalNum);
    // console.log(total);
    res.send({
        code:0,
        msg:"ok",
        data:{
            list:list,
            total:total,
        }
    });
});
module.exports=touter;