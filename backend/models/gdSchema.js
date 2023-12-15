import mongoose from "mongoose";

const gdSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "interview",
    // required: true,
  },
  topic: {
    type: String,
    required: [true, "Please provide topic for group discussion"],
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "candidate",
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  candidates: [
    {
      candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidate",
      },
      isRejected: Boolean,
      marks: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const gd = mongoose.model("gd", gdSchema);

export default gd;
