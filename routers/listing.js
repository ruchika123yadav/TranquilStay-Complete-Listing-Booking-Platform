const express = require('express')
const router = express.Router();
const asyncWrap=require('../utils/wrapAsync.js')
const ExpressError=require('../utils/ExpressError.js');
const {listingSchema}=require("../vlidateSchema");
const Listing = require('../models/listing.js')

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



router.get('/',async (req,res)=>{
   const allListings= await Listing.find()
   res.render('listings/index.ejs',{allListings})
})

// CREATE NEW GET ROUTE
router.get('/new',(req,res)=>{
    res.render('listings/new.ejs')
})

// CREATE NEW POST ROUTE  
// YHA ASYNC ERROR AA SKTA HAII
router.post('/' ,validateListing,
    asyncWrap(async(req,res,next)=>{
    const list = new Listing(req.body.listing) //yha se ham req me se ek list le rhe or ussko fir niche save bhi krwa rhe to hame ush jagaj async error aa skta hai 
    await list.save()
    //  res.send("Here is my post")
    res.redirect('/listings')
   
 }))

// CREATE THE UPDATE ROUTE (GET)
router.get('/:id/edit',
    asyncWrap(async(req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id);
    res.render('listings/edit.ejs',{listing})

}))

// SHOW ROUTE
router.get('/:id',
    asyncWrap(async (req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id).populate('review');
    res.render('listings/show.ejs',{listing})

}))

// ROUTE FOR PUT TO UPDATE AFTER THE GET ROUTE
router.put('/:id',validateListing,
    asyncWrap(async(req,res)=>{
    
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing")  // ye wha error show hoga jha pee ham as a API call ho just ye tumhe apne website wale pe nhi dikhega hoppscotch pe dikh jayega
    //     //400 means bad request gyi hai server pe
    // }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listing/${id}`);
 
}))
 
// ROUTE FOR DELETE THE LISTING
router.delete('/:id/delete',
    asyncWrap(async(req,res)=>{
    let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   res.redirect('/listing')
 }))


 module.exports=router;
