const jwt=require("jsonwebtoken");
const auth=()=>{
    return (req,res,next)=>{
        //得到请求头中的Access-Token
        let token=req.get("Access_Token");
         //判断token是否存在，
        if(!token){
            res.status(401).send("用户认证失败");
            return;
        }
        try{
            let userInfo=jwt.verify(token,"hello");
            req.userInfo=userInfo;
            next();

        }catch(error){
            res.status(401).send("用户认证失败");
        }
       
    }
}
module.exports=auth;