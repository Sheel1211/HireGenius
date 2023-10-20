import coding from "../models/codingSchema.js";
import mongoose from "mongoose";
import interview from "../models/interviewSchema.js";

export const createQuestion = async (req, res) => {
  try {
    const { questions, duration, interviewId,title } = req.body;
    console.log(req.body);

    // Extract the interviewId from the object in req.body
    const interviewIdValue = interviewId;
    // Convert interviewIdValue to ObjectId
    const interviewObjectId = new mongoose.Types.ObjectId(interviewIdValue);
    
    const interviewData = await interview.findById(interviewObjectId);

    console.log("interviewData " + interviewData)
    const candidates = interviewData ? interviewData.candidates.filter(
      (candidate) => !candidate.isRejected
    ) : [];

    // console.log("candidates : "+ candidates);

    // const data = {
    //   questions,
    //   duration,
    //   interviewId: interviewObjectId,
    //   candidates,
    // };

    // console.log("data", data);
    
    const codingQuestion = new coding({
      questions,
      duration,
      title,
      interviewId: interviewObjectId,
      candidates,
    });

    await codingQuestion.save();

    const codingId = codingQuestion._id;
    // Generate Link logic
    const codingLink = `http://localhost:5173/coding/${codingId}?interviewId=${interviewObjectId}`;

    codingQuestion.testLink = codingLink;

    await codingQuestion.save();

    // Data to push into the rounds array of interview schema
    const newRoundData = {
      roundId: codingQuestion._id,
      name: "Coding",
    };

    interview
      .findById(interviewObjectId)
      .exec()
      .then((foundInterview) => {
        if (!foundInterview) {
          console.error("Interview not found.");
        } else {
          foundInterview.rounds.push(newRoundData);
          foundInterview
            .save()
            .then((updatedInterview) => {
              console.log("Round added successfully:", updatedInterview);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
    res.status(200).json({
      success: true,
      message: "Question created successfully",
      codingLink,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};


export const getQuestions = async(req,res)=>{
  try{
    const codingId = req.params.codingId;
    console.log(codingId)

    const codingRound = await coding.findById(codingId);

    res.status(200).json({
      success:true,
      codingRound
    })
  }
  catch(e){
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
}