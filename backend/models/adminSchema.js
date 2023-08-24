import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide admin name"],
  },
  email: {
    type: String,
    required: [true, "Please provide admin email"],
    validate: [validator.isEmail, "Please provide valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  
});

const admin = mongoose.model("admin",adminSchema);

export default admin;