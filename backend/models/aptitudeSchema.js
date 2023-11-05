import mongoose from "mongoose";

const aptitudeSchema = new mongoose.Schema(
  {
    aptitudeId: {
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
    candidates: [
      {
        candidateId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "candidate",
        },
        isRejected: {
          type: Boolean,
          default: false,
        },
        gain: {
          type: Number,
          default: 0,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
    ],
    testLink: {
      type: String,
    },
    expiry: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const aptitude = mongoose.model("Aptitude", aptitudeSchema);

export default aptitude;
