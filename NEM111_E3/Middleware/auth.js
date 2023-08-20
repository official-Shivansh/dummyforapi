const jwt= require("jsonwebtoken")
const {blacklist} = require("../blacklist")

const auth =(req,res,next)=>{
        const token = req.headers.authorization?.split(" ")[1]

        if(token){
           if(blacklist.includes(token)){
            res.json({msg:"Login again the tokin is expired"})
           }
           try{
            jwt.verify(token,"shivansh",(err,decode)=>{
                if(decode){
                    next()
                }
                else{
                    res.status(200).json({msg:"token is not valid"})
                }
            })

           }
           catch(err){
                res.status(400).json({error:err.messagge})
           }
        }
        else{
            res.json({msg:"token require, you should login again"})
        }
}
module.exports={
    auth
}