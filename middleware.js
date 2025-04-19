const Listing=require("./models/listing.js")

module.exports.isLoogedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl//ye originalUrl wo hai jisko hamne click kiya hai login na krne se phele mtlb pura url hai ye wo
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

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id); // ✅ await and remove {id}

    if (!listing) {
        req.flash("Failure", "Listing not found!");
        return res.redirect("/listing");
    }

    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("Failure", "You are not the owner to make changes.");
        return res.redirect(`/listing/${id}`);
    }

    next();
}

 