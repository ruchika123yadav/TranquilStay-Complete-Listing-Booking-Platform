const express = require('express')
const router = express.Router();
const User = require("../models/user");
const asyncWrap=require('../utils/wrapAsync.js')
const ExpressError=require('../utils/ExpressError.js');
const passport = require('passport');

router.get("/signup",(req,res)=>{
    res.render("./user/signup.ejs");
})

router.post("/signup" ,asyncWrap(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser= new User({username,email})
    console.log(newUser)
    await User.register(newUser,password)
    req.flash("Success","Welcome to the TranquilStay")
    res.redirect("/listing")
}catch(e){
  req.flash("Failure",e.message)
  res.redirect("/signup")
}
    
}))

router.get("/login",(req,res)=>{
    res.render("./user/login.ejs")
})

router.post("/login",
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
    
    async(req,res)=>{
        req.flash("Success","Welcome back to the TranquilStay")
        res.redirect("/listing")
})


module.exports=router