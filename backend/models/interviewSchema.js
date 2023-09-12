import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please enter the Type of Interview"],
  },
  rounds: [{ type: mongoose.Schema.Types.ObjectId }],
});

const interview = mongoose.model("interview", interviewSchema);
export default interview;
