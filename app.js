const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const methodOverride= require('method-override')
const Listing = require('./models/listing.js')
const ejsMate = require('ejs-mate')
const asyncWrap=require('./utils/wrapAsync.js')
const ExpressError=require('./utils/ExpressError.js');
const validateSchema=require("./vlidateSchema");
const { valid } = require('joi');


const app = express();
const port = 3000;


// middleware for the validation of schema agr maanlo ek koi bhi cheez rah gyi listing ki ham hopssscotch ke through rhe hai mtlb api ke throught o whii hai dikkat

const validateListing= (err,req,res,next)=>{
          const error = validateSchema.validate(res.body);
          if(error){
            let errorMsg=error.details.map((el)=>el.message).join(',')
            throw new ExpressError(400,errorMsg)
          }
          else{
            next()
          }
}


// some setups
app.set("views engine",'ejs')
app.set("views",path.join(__dirname,'/views'))
app.engine('ejs',ejsMate);

app.use(express.static(path.join(__dirname,'/public')))
// app.use(express.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(methodOverride("_method"))


// STARTING THE APP

app.listen(port,(req,res)=>{
    console.log("Conneted to the app")
})

// ***********************************************************************

// CONNECTION TO THE DATABASE

main().then(()=>{
    console.log("Connected to mongoose")
}).catch((e)=>{
    console.log(e)
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/TranquilStay')
}

app.get('/',(req,res)=>{
    res.send("Here is my first full stack website ")
})


// **************************************************************************

// *********INDEX ROUTE*******
app.get('/listings',async (req,res)=>{
   const allListings= await Listing.find()
   res.render('listings/index.ejs',{allListings})
})

// CREATE NEW GET ROUTE
app.get('/listing/new',(req,res)=>{
    res.render('listings/new.ejs')
})

// CREATE NEW POST ROUTE  
// YHA ASYNC ERROR AA SKTA HAII
app.post('/listings' ,validateListing,
    asyncWrap(async(req,res,next)=>{
    const list = new Listing(req.body.listing) //yha se ham req me se ek list le rhe or ussko fir niche save bhi krwa rhe to hame ush jagaj async error aa skta hai 
    await list.save()
    //  res.send("Here is my post")
    res.redirect('/listings')
    
   
 }))

// CREATE THE UPDATE ROUTE (GET)
app.get('/listing/:id/edit',
    asyncWrap(async(req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id);
    res.render('listings/edit.ejs',{listing})

}))

// SHOW ROUTE
app.get('/listing/:id',
    asyncWrap(async (req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id);
    res.render('listings/show.ejs',{listing})

}))

// ROUTE FOR PUT TO UPDATE AFTER THE GET ROUTE
app.put('/listing/:id',validateListing,
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
app.delete('/listing/:id/delete',
    asyncWrap(async(req,res)=>{
    let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   res.redirect('/listings')
 }))




//  ****************ERROR HANDLERS*****************
app.all('*',(req,res,next)=>{
      next(new ExpressError(404,'PAGE NOT FOUND'))
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;//ye defualts values haii message ki agr koi message nhi diya print krne ko to ye aa jayega
    // res.status(statusCode).send(message)
    res.render('listings/error.ejs',{message})
    })