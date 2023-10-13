import candidate from "../models/candidateSchema.js";
import interview from "../models/interviewSchema.js";
import jwt from "jsonwebtoken";

export const candidateLogin = async (req, res) => {
  console.log("yes in candidate login")
  try {
      const { username, password,interviewId} = req.body;
      const candidateData = await candidate.findOne({ username, password });
    
     console.log("candidate data : ",candidateData)

      if (!candidateData || candidateData === undefined || candidateData === null) {
        return res
          .status(204)
          .send({ success: false, message: "No candidate for given data" });
      } else {
         
      const interviewData = await interview.findById({_id:interviewId});
      //console.log("interviewData",interviewData)

      if (!interviewData) {
        return res
          .status(204)
          .send({ success: false, message: "Interview not found" });
      }
      const candidateId = candidateData._id;
  
      // // Define a Mongoose query to check if the candidate's _id is in the interview's candidates array
      // const isCandidateInInterviewQuery = {
      //   _id: interviewId,
      //   'candidates.candidateId': candidateId,
      //   'candidates.isRejected': false
      // };
    
      // // Use Mongoose to execute the query
      // const isCandidateInInterview = await interview.findOne(isCandidateInInterviewQuery);

     
      const isCandidateInInterview = interviewData.candidates.some((candidate) =>
        candidate.candidateId.equals(candidateId) && candidate.isRejected === false
      );

      console.log("isCandidateInInterview",isCandidateInInterview)
        
        if(isCandidateInInterview){

          const authToken = jwt.sign(
            { id: candidateData._id },
            process.env.JWT_KEY
          );
          candidateData.authToken = authToken;
          await candidateData.save();
          return res
            .status(200)
            .cookie("token", authToken, {
              expires: new Date(Date.now() + 10 * 60 * 1000),
              httpOnly: true,
              sameSite: "none",
            })
            .send({
              success: true,
              message: "candidate loggedIn succcessfully",
              user: candidateData,
              type: "candidate",
            });

        }else{
          return res
          .status(204)
          .send({ success: false, message: "You are not valid candidate" });
        }
      }

      
    } catch (error) {
      return res
        .status(500)
        .send({
          sucess: false,
          message: "Internal server error",
          data: error.message,
        });
    }
  };