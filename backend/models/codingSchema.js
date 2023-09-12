const mongoose = require('mongoose')

const codingSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  questions: [
    {
      question: {
        type: String,
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
    required: [true, "Please provide duration of coding test"],
  },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "candidate" }],
});


const coding = mongoose.model("coding",codingSchema);

export default coding;