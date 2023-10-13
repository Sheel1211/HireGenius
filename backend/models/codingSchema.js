import mongoose from "mongoose";

const codingSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "interview",
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
          input: String, // Test case input
          output: String, // Expected output for the test case
        },
      ],
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
      },
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
});

const coding = mongoose.model("coding", codingSchema);

export default coding;
