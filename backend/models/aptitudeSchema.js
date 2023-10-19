import mongoose from "mongoose";

const aptitudeSchema = new mongoose.Schema(
  {
    aptitudeId: {
      type: String,
    },
    title: {
      type: String,
    },
    questions: [{}],
    duration: {
      type: Number,
      default: 0,
    },
    negativeMarking: {
      type: Number,
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

export default aptitude;
