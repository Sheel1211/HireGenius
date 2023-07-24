import express from "express";
import {app} from "./app.js"
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";

dotenv.config({path:"backend/config/config.env"})

app.get("/",(req,res)=>{
    res.send("Server is running");
})

app.listen(process.env.PORT || 4000,()=>{
    console.log(`server started on port ${port}`);
})