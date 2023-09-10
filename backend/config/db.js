const mongoose = require('mongoose');
require('dotenv').config();


const DATABASE_URI = process.env.DB_URI

mongoose.connect(`${DATABASE_URI}`).then(()=>{
    console.log("MongoDB connection established.");
}).catch((e)=>{
    console.log("MongoDB connection established.",e.message);
})
