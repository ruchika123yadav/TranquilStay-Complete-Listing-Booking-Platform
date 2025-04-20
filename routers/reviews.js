const express = require('express')
const router = express.Router({mergeParams:true});
const asyncWrap=require('../utils/wrapAsync.js')
const ExpressError=require('../utils/ExpressError.js');
const {listingSchema,reviewSchema}=require("../vlidateSchema");
const Listing = require('../models/listing.js')
const Review = require('../models/review.js')
const {isLoogedin }=require("../middleware.js")
const reviewController=require("../Controllers/review.js")

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

router.post("/review",isLoogedin,validateReview,asyncWrap(reviewController.createReview ));


//  POST ROUTE FOR REVIEWS
router.delete("/reviews/:reviewId",isLoogedin,asyncWrap(reviewController.destroyReview))

module.exports=router