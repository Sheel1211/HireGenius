import mongoose from "mongoose";

const gdSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  topic: {
    type: String,
    required: [true, "Please provide topic for group discussion"],
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
  },
  duration: {
    type: Number,
    required: [true, "Please provide duration of gd test"],
  },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "candidate" }],
});

const gd = mongoose.model("gd", gdSchema);

export default gd;
