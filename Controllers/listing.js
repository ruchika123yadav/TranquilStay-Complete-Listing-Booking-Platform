const Listing=require("../models/listing.js");
 

module.exports.index=
    async (req,res)=>{
        const allListings= await Listing.find()
        res.render('listings/index.ejs',{allListings})
     }


module.exports.renderNewForm=(req,res)=>{
    res.render('listings/new.ejs')
}

module.exports.showListing=async (req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id).populate({path:'review',populate:{path:"author"},}).populate('owner');
    if(!listing){
        req.flash("Failure","lisiting you requested for does not exists")
        return res.redirect("/listing")
    }
     res.render('listings/show.ejs',{listing})

}


module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path
    let filename=req.file.filename
    const list = new Listing(req.body.listing) //yha se ham req me se ek list le rhe or ussko fir niche save bhi krwa rhe to hame ush jagaj async error aa skta hai 
    list.image={url,filename}
    list.owner=req.user._id;
    await list.save()
    req.flash("Success","New lisiting Created!")
    //  res.send("Here is my post")
    res.redirect("/listing")
   
 }

 module.exports.renderEditForm=async(req,res)=>{
      let {id} = req.params;
      const listing=await Listing.findById(id);
     if(!listing){
         req.flash("Failure","lisiting you requested for does not exists")
         return res.redirect("/listing")
     }
      res.render('listings/edit.ejs',{listing})
 
 }


 module.exports.updateListing=async(req,res)=>{
    
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing")  // ye wha error show hoga jha pee ham as a API call ho just ye tumhe apne website wale pe nhi dikhega hoppscotch pe dikh jayega
    //     //400 means bad request gyi hai server pe
    // }
    let {id} = req.params;
     
   let list= await Listing.findByIdAndUpdate(id,{...req.body.listing})//ye req.body file ke alawa sab kuch save krr dega
   if(typeof req.file!=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename
    list.image={url,filename};
    await list.save();
   }
    req.flash("Success","lisiting is Updated!")

    res.redirect(`/listing/${id}`);
 
}

module.exports.deleteListing=async(req,res)=>{
    let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("Failure","lisiting is Deleted!")
   res.redirect('/listing')
 }