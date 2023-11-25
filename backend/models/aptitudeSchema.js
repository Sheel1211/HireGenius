import mongoose from "mongoose";

const aptitudeSchema = new mongoose.Schema(
  {
    aptitudeId: {
      type: String,
    },
    questions: [{}],
    negativeMarking: {
      type: Number,
      default: 0,
    },
    candidates: [
      {
        candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "candidate" },
        gain: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
        isSubmitted: { type: Boolean, default: false },
        isRejected: { type: Boolean, default: false },
        submissionTime: { type: Date, default: Date.now },
      },
    ],
    testLink: {
      type: String,
    },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now },
    testLinkDuration: { type: Date },
    isStarted: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    testDuration: { type: Number, default: 0 }, // testDuration of aptitude test in minutes
  },
  { timestamps: true }
);

const aptitude = mongoose.model("Aptitude", aptitudeSchema);

export default aptitude;
