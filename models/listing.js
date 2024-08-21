const mongoose = require("mongoose")

const Schema = mongoose.Schema;

 const ListingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/a-house-with-a-pool-in-front-of-it-puk9ju-kWHI",  
         set:(v)=>
            v===""
         ?"https://unsplash.com/photos/a-house-with-a-pool-in-front-of-it-puk9ju-kWHI"
         :v,
    },
    price:Number,
    location:String,
    country:String,
 })

 const Listing = mongoose.model('Listing',ListingSchema);

 module.exports=Listing; 