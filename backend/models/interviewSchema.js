import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  type: [
    {
      type: String,
      required: [true, "Please enter the Type of Interview"],
    },
  ],
  title: { type: String },
  candidates: [
    {
      candidateId: { type: mongoose.Schema.Types.ObjectId },
      isRejected: { type: Boolean, default: false },
    },
  ],
  rounds: [{ type: mongoose.Schema.Types.ObjectId }],
  client: { type: mongoose.Schema.Types.ObjectId },
});

const interview = mongoose.model("interview", interviewSchema);
export default interview;
