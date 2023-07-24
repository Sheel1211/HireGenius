import mongoose from "mongoose";

const connectDB=()=>{
    mongoose.connect(DB_URI).then(()=>{
        console.log("Successfully connected to the database");
    }).catch((e)=>{
        console.log(e);
    })
}

module.exports = connectDB;