const sgMail = require('@sendgrid/mail');
const User= require('../models/user.js');
const OTP= require('../models/otp.js')
const crypto= require('crypto')
const otpStore = {};



sgMail.setApiKey('SG.rVgUAoUYRuGL6h8srBLMinvQ.soulcbl5lYz-ATux4NRUp8AY2PyoGYA099UOkzZXUIUEhPIfsesport');


exports.emailAuthentication= async(req,res,next)=>{
  try{
      const {email}=req.body;
      if(!email)  { return res.status(403).json({msg:'Email is required'})}

      const mails= [
          "eixdeal.com",
          "mvpalace.com",
          "mailinator.com",
          "10minutemail.com",
          "guerrillamail.com",
          "dispostable.com",
          "yopmail.com",
      ]
      const domain= email.substring(email.lastIndexOf("@")+1)
      const tempMail=mails.includes(domain.toLowerCase());

      if(tempMail) { return  res.status(403).json({msg:'This email is Temporary and from untrusted domains'}) }
   
      const user= await User.findOne({email})
      if(user) return res.status(400).json({msg:"This email is already used"})

      const otp= crypto.randomInt(100000,999999).toString();
      const identifier= email;

      const sendOTP = async (to, otp) => {
         const msg = {
           to: to,
           from: 'rishiganeshe33@gmail.com',
           subject: 'Your OTP Code',
           text: `Your OTP is: ${otp}`,
         };
     
         try {
             await sgMail.send(msg);
             console.log('OTP sent successfully');
             const newotp= new OTP({identifier,otp})
             await newotp.save();
         } catch (err) {
             console.error('Error sending OTP:', err);
             return res.status(500).json({msg:"Error in sending OTP"})
         }
     }

     await sendOTP(identifier, otp);
     next();

  }catch(err){
     console.log("Error In Sending Email",err)
     return res.status(500).render('Error500')
  }
}




