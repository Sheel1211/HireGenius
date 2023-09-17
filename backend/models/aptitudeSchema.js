const mongoose = require("mongoose");

const aptitudeSchema = new mongoose.Schema(
  {
    aptitudeId: {
      type: String,
    },
    questions: [{}],
    duration: {
      type: Number, // Minutes
      default: 0,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "candidate" }],
  },
  { timestamps: true }
);

const aptitude = mongoose.model("Aptitude", aptitudeSchema);

module.exports = aptitude;
