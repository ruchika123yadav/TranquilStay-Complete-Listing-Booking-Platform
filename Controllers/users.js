const User = require("../models/user");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signUp=async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const user = new User({ username, email });
      await User.register(user, password);
      req.login(user,(err)=>{
        if(err){
            return next(err);
        }
         req.flash("Success","Welcome to the TranquilStay")
    res.redirect("/listing")
    })
  
    } catch (e) {
        req.flash("Failure","A user with the given username is already registered")
       if (!res.headersSent) {
        res.render('signup', { errorMessage: e.message });
      }
    }
  }


module.exports.login=async(req,res)=>{
         req.flash("Success","Welcome back to the TranquilStay")
        let redirectUrl=res.locals.redirectUrl || "/listing"
        console.log(redirectUrl)
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
