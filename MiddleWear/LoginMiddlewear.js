const jwt=require('jsonwebtoken')

const loginMiddlewear=(req,res,next)=>{
    const token=req.header("x-token");
    if(!token){
       return  res.send("token not available")
    }
    const pl= jwt.verify(token,'JSONSTRINGWEB')
    if(!pl){
        return res.send("invalid token")
    }
    if(pl.user){
        next()
        
    }
        }
    



module.exports=loginMiddlewear;