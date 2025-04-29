module.exports.renderSignUpForm=(req,res)=>{
    res.render("./user/signup.ejs");
}

module.exports.signUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        console.log(username);
        
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

    // newUser.save();

}catch(e){
  req.flash("Failure",e.message)
  res.redirect("/signup")
}
    
}


module.exports.login=async(req,res)=>{
         req.flash("Success","Welcome back to the TranquilStay")
        let redirectUrl=res.locals.redirectUrl || "/listing"
         res.redirect(redirectUrl)
}


module.exports.logout=(req,res,next)=>{
    req.logOut(err=>{
        //ye ek callback leta hai as aparamter mtlb jese hi user logout ho jaye to immediately kya ho uske baad
        if(err){
           next(err); 
        }
        req.flash("Failure","You are Successfully Logged Out")
        res.redirect("/listing")
    })
 }
