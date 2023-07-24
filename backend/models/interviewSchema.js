import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  
});

const interview = mongoose.model("interview",interviewSchema);
export default interview;