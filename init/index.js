// 1. Sabse upar dotenv load karo
require('dotenv').config();

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

// 2. Env var se URL read karo
const dbUrl = "mongodb+srv://ruchikayadavtech:MpE2sVyarE5SdIkF@cluster1.beorfcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
// console.log(dbUrl)

async function main() {
  // 3. Agar URL undefined hua to error throw karo
  if (!dbUrl) {
    throw new Error('ATLASBB_URL environment variable missing!');
  }
  await mongoose.connect(dbUrl);
  console.log('✅ Connected to MongoDB Atlas');
  // 5. Seed function ko yahin call karo
  await intiDB();
  mongoose.connection.close();
}

async function intiDB() {
  // 4. Pehle purane data delete karo
  await Listing.deleteMany({});
  // 5. Naya data insert karo
//   await Listing.insertMany(initData.data);
initData.data=initData.data.map((obj)=>({...obj,owner:'6810ac5a9c9d1ea8ea456434'}))
initData.data=initData.data.map((obj)=>({...obj}))
await  Listing.insertMany(initData.data)
  console.log('🎉 Data inserted successfully');
}

// 6. Main ko call karo aur handle karo errors
main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});


// initData.data=initData.data.map((obj)=>({...obj,owner:'67fcfc39504329106cff4d24'}))
// initData.data=initData.data.map((obj)=>({...obj}))
// await  Listing.insertMany(initData.data)


// 6810ac5a9c9d1ea8ea456434