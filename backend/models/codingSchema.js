import mongoose from "mongoose";

const codingSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "interview",
  },
  questions: [
    {
      title: {
        type: String,
      },
      problemStatement: {
        type: String,
      },
      testcases: [
        {
          input: String,
          output: String,
        }
      ],
      difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
      },
      marks: {
        type: Number,
      },
    },
  ],
  duration: {
    type: Number,
    required: true,
    default: 60,
  },
  candidates: [
    {
      candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidate",
      },
      isRejected: Boolean,
      marks:{
        type:Number,
        default:0,
      }
    },
  ],
  testLink: String, 
});

const coding = mongoose.model("coding", codingSchema);

export default coding;
