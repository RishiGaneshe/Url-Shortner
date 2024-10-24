const express= require('express');
const router= express.Router();
const User= require('../controllers/user.js')
const {emailAuthentication}= require('../middlewares/emailService.js')



router.get("/",User.handleUserAccessPage)

router.get("/login",User.handleUserLoginPage)

router.get("/signup",User.handleUserSignupPage)

router.get("/:shortId",User.handleRedirectURL)

router.post("/login",User.handleUserLogin)

router.post("/signup",emailAuthentication,User.handleUserSignUp)

router.post("/signup/otp",User.handleOtp)





module.exports= router;
