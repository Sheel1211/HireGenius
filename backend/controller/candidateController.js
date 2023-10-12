import candidate from "../models/candidateSchema.js";
import interview from "../models/interviewSchema.js";
import jwt from "jsonwebtoken";

export const candidateLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const candidateData = await candidate.findOne({ email, password });
  
      if (!candidateData || candidateData === undefined || candidateData === null) {
        return res
          .status(204)
          .send({ success: false, message: "No candidate for given data" });
      } else {
        
        // const approveClientData = await client.findOne({
        //   email: email,
        //   password: password,
        //   approved: true,
        //   rejected: false,
        // });

        // if (
        //   !approveClientData ||
        //   approveClientData === undefined ||
        //   approveClientData === null
        // ) {
        //   return res
        //     .status(202)
        //     .send({ success: false, message: "You are not Approved as client" });
        // } else {
        //   const authToken = jwt.sign(
        //     { id: approveClientData._id },
        //     process.env.JWT_KEY
        //   );
        //   approveClientData.authToken = authToken;
        //   await approveClientData.save();
        //   return res
        //     .status(200)
        //     .cookie("token", authToken, {
        //       expires: new Date(Date.now() + 10 * 60 * 1000),
        //       httpOnly: true,
        //       sameSite: "none",
        //     })
        //     .send({
        //       success: true,
        //       message: "client loggedIn succcessfully",
        //       user: approveClientData,
        //       type: "client",
        //     });
        // }
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