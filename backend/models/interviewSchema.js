import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  type: [
    {
      type: String,
      required: [true, "Please enter the Type of Interview"],
    },
  ],
  title:{type:String},
  candidates: [[{ type: mongoose.Schema.Types.ObjectId }]],
  rounds: [{ type: mongoose.Schema.Types.ObjectId }],
  client:{ type: mongoose.Schema.Types.ObjectId }
});
 
const interview = mongoose.model("interview", interviewSchema);
export default interview;
