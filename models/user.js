const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose")
//ye hamare liye automatically username,hashing,Salting and hashpassword in sabko automatically impement krr deta hai

const userSchema= new Schema({
    email:{
        type:String,
        required:true,
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema)