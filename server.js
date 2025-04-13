const express= require("express")

const app=express();
const session=require("express-session")

app.use(session({secret:"MySecret"}))

app.listen(8080,()=>{
    console.log("Connected to the app")
})

app.get("/test",(req,res)=>{
      res.send("Test successfull");
})

app.get("/getcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    res.send(`You sent a request ${req.session.count} times`)
})

app.get("/register",(req,res)=>{
    let {name='anonymous'}=req.query;
    req.session.name=name;
 res.redirect("/hello")     
})

app.get("/hello",(req,res)=>[
    res.send(`hello ${req.session.name}`)
])