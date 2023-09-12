const mongoose = require('mongoose')

const aptitudeSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  questions: [
    {
      question: {
        type: String,
      },
      options: [
        {
          type: String,
        },
      ],
    },
  ],
  duration: {
    type: Number,
    required: [true, "Please provide duration of aptitude test"],
  },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "candidate" }],
});

const aptitude = mongoose.model("aptitude",aptitudeSchema);

export default aptitude;