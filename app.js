const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const methodOverride= require('method-override')
const Listing = require('./models/listing.js')


const app = express();
const port = 3000;


// some useful setups
app.set("views engine",'ejs')
app.set("views",path.join(__dirname,'/views'))

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


// SHOW ROUTE
app.get('/listing/:id',async (req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id);
    res.render('listings/show.ejs',{listing})

})

