const {verify} = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
    const accessToken =  req.header("accessToken");
    if(!accessToken) return res.json({login:false,message:"User not logged in..."})
   try {
    const validateToken = verify(accessToken,"kings")
    if(validateToken){
        req.user = validateToken
        return next();
    }
   }
   catch(err) {
        return res.json({login:false,message:err})
   }
};

module.exports = {verifyToken}