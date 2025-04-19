const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const methodOverride= require('method-override')
 const ejsMate = require('ejs-mate')
 const ExpressError=require('./utils/ExpressError.js');
 const { valid } = require('joi');// to validate our schema mtlb individual fields ke andr validation perform krr diya
 const session=require("express-session")
const flash = require('connect-flash')
const passport= require("passport")//Express compaitable authentication middleware for node.js
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
 

const app = express();
const port = 3000;

// ***********starting the app************
app.listen(port,(req,res)=>{
    console.log("Conneted to the app")
})

 
//*************** */ CONNECTION TO THE DATABASE*****************

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



// ************This is the path setup for views and public folder*****************
app.set("views engine",'ejs')
app.set("views",path.join(__dirname,'/views'))
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'/public')))

// app.use(express.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));//ye form ke data ko javasript object me change krta hai jise me req.body se access kr lete hai jese 
app.use(express.json())
app.use(methodOverride("_method"))//for the put and delete method


 
//  ********************  EXPRESS   ROUTERS **********************
const listingRouter= require("./routers/listing.js")
const reviewRouter= require("./routers/reviews.js")
const userRouter= require("./routers/user.js")

 


// ************* SETUP FOR THE SESSION AND COOKIE ****************
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
//  ye saari cheez ko hamesha hame session ke niche hi likhna hai kyuki ham chahte hai ki user ko baar login na krna ade agr wo ek page se dusre page me jaa rha hai to wo logout na hoo jaye

 app.use(passport.initialize())//Passport.js ko hamari app me shuru (initialize) karo.
 app.use(passport.session())//kya same user request bhej rha hai ki differnt user bhej rha
 passport.use(new LocalStrategy(User.authenticate()))//ye hamara static method hai jo passport mongoose ne by deafult add kiya hai
//  Ye login karne wale user ko verify karta hai 
 passport.serializeUser(User.serializeUser());//Jab user login karta hai, to uska ID session me store kiya jata h
 passport.deserializeUser(User.deserializeUser());// jab user ka session khatam ho gya to uski info ko bhr nikaal do



 
//   ******************LOCAL VARIABLES*********************
// Defining the local variable that can be access in ejs template also
app.use((req,res,next)=>{
    res.locals.success=req.flash("Success")
    res.locals.failure=req.flash("Failure")
    res.locals.currUser=req.user;
    next()
})

 

// *********INDEX ROUTE*******
app.use("/listing",listingRouter)
app.use("/listing/:id",reviewRouter)
app.use("/",userRouter)




// **********COOKIES**************
// ye kuch hamara aisha data hota hai jo ki user ke browser pe place ho jata hai
// const cookiePArser=require('cookie-parser')
// app.use(cookieParser())directly req.cookie se cookie access krna mushkil hota ishliye iska use krte

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
    // console.log(req.cookie);to acces not signed cookie
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









    // ****************MORE DETAILS********************

    // agr me sirf next() likh rhi mtlb me apne kuch cutsom error handler banaya hai usko call krwa rhi hu
    //lekin agr mene next(err) aishe likha hai to me express ka custom error handler call karwaya hai
    // client side validation ham krte hai form ke jariye 
    // or server side validation krte hai ham joi ki help se
    // session ke andr hamari cookie store hoti hai
    // Stateful and Stateless protocol
    // ham session me apne se bhi kuch value store kra skte jese req.session.name="Ruchika Yadav"
    // .User.register() to sae the user credentials