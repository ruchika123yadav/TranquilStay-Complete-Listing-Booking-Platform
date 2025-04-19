const express = require('express')
const router = express.Router();
const asyncWrap=require('../utils/wrapAsync.js')
const ExpressError=require('../utils/ExpressError.js');
const {listingSchema}=require("../vlidateSchema");
const Listing = require('../models/listing.js')
const {isLoogedin,savedRedirectUrl,isOwner}=require("../middleware.js")
const listingController=require("../Controllers/listing.js")

// middleware for the validation of schema agr maanlo ek koi bhi cheez rah gyi listing ki ham hopssscotch ke through rhe hai mtlb api ke throught o whii hai dikkat

const validateListing= (err,req,res,next)=>{
    const error = listingSchema.validate(res.body);
    if(error){
      let errorMsg=error.details.map((el)=>el.message).join(',')
      throw new ExpressError(400,errorMsg)
    }
    else{
      next()
    }
}
//  INDEX ROUTE
router.get('/',asyncWrap(listingController.index))

// CREATE NEW GET ROUTE
router.get('/new',isLoogedin,asyncWrap(listingController.renderNewForm))

// CREATE NEW POST ROUTE  
 router.post('/' ,validateListing,
    asyncWrap(listingController.createListing))

// CREATE THE UPDATE ROUTE (GET)
router.get('/:id/edit',isLoogedin,isOwner,
    asyncWrap(listingController.renderEditForm))

// SHOW ROUTE
router.get('/:id',
    asyncWrap(listingController.showListing))

// ROUTE FOR PUT TO UPDATE AFTER THE GET ROUTE
router.put('/:id',isLoogedin,validateListing,
    asyncWrap(listingController.updateListing))
 
// ROUTE FOR DELETE THE LISTING
router.delete('/:id/delete',isLoogedin,isOwner,
    asyncWrap(listingController.deleteListing))


 module.exports=router;
