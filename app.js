const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const methodOverride= require('method-override')
const Listing = require('./models/listing.js')
const ejsMate = require('ejs-mate')


const app = express();
const port = 3000;


// some useful setups
app.set("views engine",'ejs')
app.set("views",path.join(__dirname,'/views'))
app.engine('ejs',ejsMate);

app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({extended:true}))
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
app.post('/listings' ,async(req,res)=>{
    const list = new Listing(req.body.listing)
   await list.save()
    //  res.send("Here is my post")
    res.redirect('listings')
 })

// CREATE THE UPDATE ROUTE (GET)
app.get('/listing/:id/edit',async(req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id);
    res.render('listings/edit.ejs',{listing})

})

// SHOW ROUTE
app.get('/listing/:id',async (req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id);
    res.render('listings/show.ejs',{listing})

})

// ROUTE FOR PUT TO UPDATE AFTER THE GET ROUTE
app.put('/listing/:id',async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listing/${id}`);
 
})

// ROUTE FOR DELETE THE LISTING
app.delete('/listing/:id/delete',async(req,res)=>{
    let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   res.redirect('/listings')
 })