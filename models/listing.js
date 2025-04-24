const mongoose = require("mongoose");
const Review = require("./review");
const { string } = require("joi");

const Schema = mongoose.Schema;

 const ListingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image: {
       url:String,
       filename:String,
  },
  
    price:Number,
    location:String,
    country:String,
    review:[//yha ham bna rhe haii array kyuki one to many relationship hai yha
          {
            type:Schema.Types.ObjectId,
            ref:"Review",
          }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
 })

  ListingSchema.post("findOneAndDelete",async(listing)=>{
   if(listing){//ye listing se bhi reviews bhi delete krr dega
      await Review.deleteMany({_id:{$in:listing.reviews}})
   }
  })

 const Listing = mongoose.model('Listing',ListingSchema);

 module.exports=Listing; 