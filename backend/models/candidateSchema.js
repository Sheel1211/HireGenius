const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
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
