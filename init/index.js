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
  await  Listing.insertMany(initData.data)
    console.log("Inserted data succesfully")
}

intiDB();