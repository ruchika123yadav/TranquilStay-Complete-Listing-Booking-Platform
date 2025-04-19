const express = require('express')
const router = express.Router();
const User = require("../models/user");
const asyncWrap=require('../utils/wrapAsync.js')
const ExpressError=require('../utils/ExpressError.js');
const passport = require('passport');
const {isLoogedin,savedRedirectUrl}=require("../middleware.js")


router.get("/signup",(req,res)=>{
    res.render("./user/signup.ejs");
})

router.post("/signup" ,asyncWrap(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser= new User({username,email})
    console.log(newUser)
    await User.register(newUser,password)
    req.login(newUser,(err)=>{
        if(err){
            return next(err);
        }
         req.flash("Success","Welcome to the TranquilStay")
    res.redirect("/listing")
    })

}catch(e){
  req.flash("Failure",e.message)
  res.redirect("/signup")
}
    
}))

router.get("/login",(req,res)=>{
    res.render("./user/login.ejs")
})

router.post("/login",savedRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
    
    async(req,res)=>{
        console.log("Hi I am ruchi")
        req.flash("Success","Welcome back to the TranquilStay")
        let redirectUrl=res.locals.redirectUrl || "/listing"
         res.redirect(redirectUrl)
})

router.get("/logout",(req,res,next)=>{
    req.logOut(err=>{
        //ye ek callback leta hai as aparamter mtlb jese hi user logout ho jaye to immediately kya ho uske baad
        if(err){
           next(err);
        }
        req.flash("Failure","You are Successfully Logged Out")
        res.redirect("/listing")
    })
 })

module.exports=router