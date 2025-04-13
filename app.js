const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const methodOverride= require('method-override')
 const ejsMate = require('ejs-mate')
 const ExpressError=require('./utils/ExpressError.js');
 const { valid } = require('joi');// to validate our schema mtlb individual fields ke andr validation perform krr diya
 
const listings= require("./routers/listing.js")
const reviews= require("./routers/reviews.js")
// const signedCookie=require('cookie-parser')
const session=require("express-session")
const flash = require('connect-flash')

const app = express();
const port = 3000;

 const sessionOption={
    secret:"mySuperSecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now +7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
 } 

 app.use(session(sessionOption))
 app.use(flash());

 
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

//   FLASH

app.use((req,res,next)=>{
    res.locals.success=req.flash("Success")
    res.locals.failure=req.flash("Failure")
    next()
})

 
// *********INDEX ROUTE*******


app.use("/listing",listings)
app.use("/listing/:id",reviews)

//  app.get("/cookie",(req,res)=>{
//        res.cookie("name","Ruchika")
//        res.cookie("Age","22")
//        res.send("I saved my cookiee")
//  })

//  app.get("/signedCookie",(req,res)=>{
//     res.cookie("Made-in","India",{signed:true})
//     res.send("Signed cookie send")
//  })


//  app.get("verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
//  })

//  ****************ERROR HANDLERS*****************
app.all('*',(req,res,next)=>{
      next(new ExpressError(404,'PAGE NOT FOUND'))
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;//ye defualts values haii message ki agr koi message nhi diya print krne ko to ye aa jayega
    // res.status(statusCode).send(message)
     res.render('listings/error.ejs',{message})
    })


    // More details
    // agr me sirf next() likh rhi mtlb me apne kuch cutsom error handler banaya hai usko call krwa rhi hu
    //lekin agr mene next(err) aishe likha hai to me express ka custom error handler call karwaya hai
    // client side validation ham krte hai form ke jariye 
    // or server side validation krte hai ham joi ki help se