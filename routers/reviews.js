const express = require('express')
const router = express.Router({mergeParams:true});
const asyncWrap=require('../utils/wrapAsync.js')
const ExpressError=require('../utils/ExpressError.js');
const {listingSchema,reviewSchema}=require("../vlidateSchema");
const Listing = require('../models/listing.js')
const Review = require('../models/review.js')
const {isLoogedin }=require("../middleware.js")


const validateReview= (err,req,res,next)=>{
    const error = reviewSchema.validate(res.body);
    if(error){
      let errorMsg=error.details.map((el)=>el.message).join(',')
      throw new ExpressError(400,errorMsg)
    }
    else{
      next()
    }
}

router.post("/review",isLoogedin,validateReview,asyncWrap(async (req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
      newreview.author=req.user._id
      listing.review.push(newreview);
      console.log(newreview)
      
      await newreview.save();
      await listing.save();
      req.flash("Success","New Review is Created!")

     res.redirect(`/listing/${listing._id}`)
 }));


//  POST ROUTE FOR REVIEWS
router.delete("/reviews/:reviewId",isLoogedin,asyncWrap(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Review.findByIdAndDelete(reviewId)
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})//post request jo di hai mene schema me listing wale usse hat jayega
    req.flash("Failure","Review is Deleted")

    res.redirect(`/listing/${id}`)
}))

module.exports=router