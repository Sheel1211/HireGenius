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
    new mongoose.Schema(
      {
        candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "candidate" },
        isRejected: { type: Boolean, default: false },
      },
      { _id: false } // Suppress the creation of a new _id field for subdocuments
    ),
  ],

  rounds: [{ type: mongoose.Schema.Types.ObjectId }],
  client: { type: mongoose.Schema.Types.ObjectId },
});
 
const interview = mongoose.model("interview", interviewSchema);
export default interview;
