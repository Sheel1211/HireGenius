import mongoose from "mongoose";

const codingSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "interview", // Assuming this is a reference to the interview
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      testcases: [
        {
          type: String,
        },
      ],
    },
  ],
  duration: {
    type: Number,
    required: true,
  },
  candidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidate",
    },
  ],
  instructions: {
    type: String,
  },
});

const coding = mongoose.model("coding", codingSchema);

export default coding;
