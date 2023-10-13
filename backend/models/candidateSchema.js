import mongoose from "mongoose";
import validator from "validator";
const candidateSchema = new mongoose.Schema({
  role:{
    type:String,
    default:"candidate"
},
  name: {
    type: String,
    required: [true, "Please provide candidate name"],
  },
  email: {
    type: String,
    required: [true, "Please provide candidate email"],
    validate: [validator.isEmail, "Please provide valid email address"],
  },
  password: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    default: null,
  },
  authToken: {
    type: String,
    default: ""
},
  interviews: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "interview",
      },
      marks: {
        type: Number,
      },
    },
  ],
});

const candidate = mongoose.model("candidate", candidateSchema);

export default candidate;
