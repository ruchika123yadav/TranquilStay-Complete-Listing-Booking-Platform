const cloudinary = require('cloudinary').v2
const {CloudinaryStorage}=require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

const storage = new CloudinaryStorage({//google drive me apne ek sotrage bna liya jha pe aap files ko upload krr rhe hai
    cloudinary: cloudinary,
    params: {
      folder: 'TranquilStay_Dev',
      allowedFormat: ["png","jpg","jpeg"],
     },
  });

  module.exports={
    cloudinary,
    storage,
  }