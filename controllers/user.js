const xss= require('xss')
const jwt= require('jsonwebtoken');
const mongoose= require('mongoose')
const validator= require('validator')
const secret= "Abhishek@Ganeshe@2002";
const OTP= require('../models/otp.js')
const User= require('../models/user.js');
const HashPass= require('../services/passwordHashing.js')
const {redisClient}= require('../services/connection.js') 
const URL = require('../models/url.js')



exports.handleUserLoginPage= async (req,res)=>{        
  try{
      return res.status(200).render('login');
  }catch(err){
      console.log(err)
      return res.status(500).render('Error500')
  }
}


exports.handleUserSignupPage= async (req,res)=>{
  try{
      res.status(200).render('signup')
  }catch(err){
      console.log(err)
      return res.status(500).render('Error500')
  }  
}


exports.handleUserAccessPage= async (req,res)=>{
  try{
      res.status(200).render('homePage')
  }catch(err){
      console.log(err)
      return res.status(500).render('Error500')
  }   
}


exports.handleRedirectURL= async(req,res)=>{
  try{
    let shortId= req.params.shortId;

    shortId=xss(validator.escape(validator.trim(shortId)));

    if(shortId==="favicon.ico"){ return res.status(200).redirect("/url") }

    const cacheKey= `RD-${shortId}` 
     try{
         const cacheData= await redisClient.get(cacheKey)
         if(cacheData){
            console.log("redirecting from cache")
            URL.updateOne( { shortId }, { $push: { visitHistory: { timestamp: Date.now() } } } )
                          .catch(err => console.log("Error updating visitHistory:", err))
            return res.status(302).redirect(cacheData);
         }
     }catch(err){
         console.log("Redis cache Error",err)
         return res.status(500).render('Error500')
     }

    const entry = await URL.findOneAndUpdate( { shortId },{ $push:{ visitHistory:{ timestamp:Date.now() } } }, { new: true });
    if(!entry){
      return res.status(404).render('Error404')
    }
    await redisClient.set(cacheKey, entry.redirectURL ,'EX', 3600)
    
    console.log("redirecting from Database")
    return res.status(302).redirect(entry.redirectURL);

  }catch(err){
     console.log("Error in Redirecting",err)
     return res.status(500).render('Error500')
  }
}


exports.handleUserLogin= async (req,res)=>{
  try{
      let {username,password}= req.body;

      username = xss(validator.escape(validator.trim(username))); // Remove any XSS vectors and escape dangerous characters
      password = xss(validator.escape(validator.trim(password)));

      const user= await User.findOne({username});
      if(!(user && await HashPass.verifyPassword(password,user.password))) {
         return res.status(401).render('login');
      }

      console.log(user.name +" logged in successfully")
      async function jwtAuth(user){                               // JSON web token based Authentication-Signature
        const token= await jwt.sign( { _id: user._id,username: user.username }, secret , { expiresIn: '100m' } );
        return token;
      }

      const token= await jwtAuth(user);
      res.cookie('session_id',token,{
         sameSite: 'Strict',
         httpOnly: true,
         secure: false,
         maxAge: 60 * 60 * 1000      
      })
      res.status(200).redirect("/url")

  }catch(err){
      console.log(err)
      return res.status(500).render('Error500')
  }
}


exports.handleUserSignUp= async (req,res)=>{
  try{
      res.status(200).render('signUpData_01')
  }catch(error){
      if (error instanceof mongoose.Error.ValidationError) {
         return res.status(400).json({ msg: "Validation error", details: error.message });
      }

      if (error.code === 11000) { // MongoDB duplicate key error code
         return res.status(409).json({ msg: "Email or Username already exists" });
      }
      return res.status(500).render('Error500')
  }
}



exports.handleOtp= async (req,res)=>{
  try{
      let {name, username, gender,password, identifier,phone, otp}= req.body
      
      name = xss(validator.escape(validator.trim(name)));         // Remove any XSS vectors and escape dangerous characters
      username = xss(validator.escape(validator.trim(username))); 
      password = xss(validator.escape(validator.trim(password)));
      gender = xss(validator.escape(validator.trim(gender)));
      identifier = xss(validator.escape(validator.trim(identifier)));
      phone = xss(validator.escape(validator.trim(phone)));
      otp = xss(validator.escape(validator.trim(otp)));

      if( !username || !password || !identifier || !otp || !name || !phone || !gender) {
        return res.status(400).json({msg:"All feilds are required"})
      }
    
      if (!validator.isEmail(identifier)) {
        return res.status(400).json({ msg: "Invalid email format" });
      }

      if (!validator.isMobilePhone(phone, 'any')) {
        return res.status(400).json({ msg: "Invalid phone number" });
      }

      if (!validator.isNumeric(otp) || otp.length !== 6) {
        return res.status(400).json({ msg: "Invalid OTP format" });
      }

      const storedOtp= await OTP.findOne({identifier,otp});
        if(storedOtp) {
           const hashedPassword= await HashPass.hashPassword(password)
           const result= await User.create({
              name: name,
              gender: gender,
              username: username,
              password: hashedPassword,
              email: identifier,
              phone: phone
           })
           if(!result) {
             console.log("Error in Created New User")
             return res.status(500).render('Error500')
           }
           console.log("New User created Successfully.")
           await OTP.deleteOne({identifier,otp})
           console.log("OTP cleared from database")
           return res.status(200).render('userCreated')
        }else{
            res.status(401).render('signup');
        }
  }catch(err){
      console.log(err)
      return res.status(500).render('Error500')
  }  
}



//twilingo code => H6B7VYGA53UEB95LMYUC5YKZ