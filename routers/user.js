const express = require('express')
const router = express.Router();
const User = require("../models/user");
const asyncWrap=require('../utils/wrapAsync.js')
const ExpressError=require('../utils/ExpressError.js');
const passport = require('passport');
const {isLoogedin,savedRedirectUrl}=require("../middleware.js");
const flash = require("connect-flash");
const userController=require("../Controllers/users.js")


// SIGNUP ROUTE
router.route("/signup")
.get(asyncWrap(userController.renderSignUpForm) )
.post(asyncWrap(userController.signUp))

//  LOGIN ROUTE
router.route("/login")
.get((req,res)=>{
    res.render("./user/login.ejs")
})
.post( savedRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,failureMessage:"Incorrect Credentails"}),
 asyncWrap(userController.login))

//  LOGOUT ROUTE
router.get("/logout",userController.logout)

module.exports=router