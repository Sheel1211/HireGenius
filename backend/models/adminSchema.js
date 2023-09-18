import mongoose from "mongoose";
import validator from "validator";

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true, "Enter your email"],
        validate: [validator.isEmail, "Provide valid Email"],
    },
    password: {
        type: String,
        required: [true, "Enter your password"],
    },
    authToken: {
        type: String,
        default: ""
    }
})

const admin = mongoose.model("admin",adminSchema);
export default admin;