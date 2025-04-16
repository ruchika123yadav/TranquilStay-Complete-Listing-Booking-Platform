module.exports.isLoogedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl//ye originalUrl wo hai jisko hamne click kiya hai login na krne se phele mtlb pura url hai ye wo
        console.log(req.session.redirectUrl)
        req.flash("Failure","You have to login to add some changes")
        return res.redirect("/login")
    } 
    next();
}

module.exports.savedRedirectUrl=(req,res,next)=>{

    if(req.session.redirectUrl){  
        console.log(req.session.redirectUrl)
        res.locals.redirectUrl=req.session.redirectUrl;
        }
        next();
}