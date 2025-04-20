const express = require('express')
const router = express.Router();
const User = require("../models/user");
const asyncWrap=require('../utils/wrapAsync.js')
const ExpressError=require('../utils/ExpressError.js');
const passport = require('passport');
const {isLoogedin,savedRedirectUrl}=require("../middleware.js");
const flash = require("connect-flash");
const userController=require("../Controllers/users.js")


router.get("/signup",asyncWrap(userController.renderSignUpForm) )

router.post("/signup" ,asyncWrap(userController.signUp))

router.get("/login",(req,res)=>{
    res.render("./user/login.ejs")
})

router.post("/login",savedRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,failureMessage:"Incorrect Credentails"}),
 asyncWrap(userController.login))
    
     

router.get("/logout", asyncWrap(userController.logout))

module.exports=router