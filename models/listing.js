const mongoose = require("mongoose");
const review = require("./review");

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
    review:[//yha ham bna rhe haii array kyuki one to many realtionship hai yha
          {
            type:Schema.Types.ObjectId,
            ref:"Review",
          }
    ]
 })

 const Listing = mongoose.model('Listing',ListingSchema);

 module.exports=Listing; 