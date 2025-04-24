
const Listing=require("../models/listing")
const Review=require("../models/review")

module.exports.createReview=async (req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
      newreview.author=req.user._id
      listing.review.push(newreview);
      console.log(newreview)
      
      await newreview.save();
      await listing.save();
      req.flash("Success","New Review is Created!")

     res.redirect(`/listing/${listing._id}`)
 }

 module.exports.destroyReview=async(req,res)=>{
     let {id,reviewId}=req.params;
     await Review.findByIdAndDelete(reviewId)
     await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})//post request jo di hai mene schema me listing wale usse hat jayega
     req.flash("Failure","Review is Deleted")
 
     res.redirect(`/listing/${id}`)
 }

