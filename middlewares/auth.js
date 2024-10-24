const secret= "Abhishek@Ganeshe@2002";
const jwt= require('jsonwebtoken')
const {redisClient}= require('../services/connection.js')


exports.restrictToLogInJWT= async(req,res,next)=>{                     // JSON web token based Authentication-varification
  try{
      const token= req.cookies.session_id 
      if(!token){ return res.status(401).render('Error401') }

      const blacklisted= await redisClient.get(token)
      if(blacklisted) {
          return res.status(401).render('Error401')
      }
      req.user= jwt.verify(token,secret);
      next();

  }catch(err){
      console.log("Invalid Token")
      return res.status(401).render('Error401')
  }
}

