const mongoose = require('mongoose')
const initData = require('./data.js')
const Listing = require('../models/listing.js')

main().then(()=>{
    console.log("Connected to mongoose")
}).catch((e)=>{
    console.log(e)
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/TranquilStay')
}




const intiDB= async ()=>{
  await   Listing.deleteMany({});
   initData.data=initData.data.map((obj)=>({...obj,owner:'67fcfc39504329106cff4d24'}))
  await  Listing.insertMany(initData.data)
    console.log("Inserted data succesfully")
}

intiDB();