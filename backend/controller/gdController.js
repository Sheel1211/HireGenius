import mongoose from "mongoose";
import candidate from "../models/candidateSchema.js";
import gd from "../models/gdSchema.js";
import { generateUniquePassword } from "../services/generateUniquePassword.js";
import { sendEmail } from "../services/sendEmail.service.js";
import interview from "../models/interviewSchema.js";

export const landingRoom = async (req, res) => {
  const {roomId} = req.params;
  console.log("room ID",roomId)

  res.render(`${process.env.BACKEND_FOLDER_PATH}\\public\\index`, { roomId });

};

export const scheduleMeet  = async(req,res)=>{

  const {topic,mentorEmail,date,time,duration,link,candidates,interviewID} = req.body;
  // console.log(interviewID,candidates);
  const interviewIdArray = candidates.map(item => {
    return {
      candidateId: new mongoose.Types.ObjectId(item._id),
      isRejected: false,
      marks: 0
    };
  });
    console.log(interviewIdArray)

const newdate = new Date(date);

// Extract date
const year = newdate.getFullYear();
const month = newdate.getMonth() + 1; // Months are zero-based
const day = newdate.getDate();

const formattedDate = `${year}-${month}-${day}`;

const newtime = new Date(time);
// Extract time
let hours = newtime.getHours();
const minutes = newtime.getMinutes();

// Determine AM or PM
const amOrPm = hours >= 12 ? 'PM' : 'AM';

// Convert hours to 12-hour format
if (hours > 12) {
  hours -= 12;
}

// Ensure hours and minutes are formatted with leading zeros
const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

// Create formatted strings
const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;


// const newLink = `${link}?date=${formattedDate}&duration=${duration}`;

  try {

    const passwordOfMentor = generateUniquePassword();

    const mentorDetails = new candidate({
      name: "mentor",
      email: mentorEmail,
      password:passwordOfMentor,
      username: mentorEmail.split("@")[0],
    });

    const mentor = await mentorDetails.save();

    if(!mentor){
      return res.status(400).json({ success: false, message: "Mentor is not added to DB"});

    }else{
      const mentorData = await candidate.findOne({name: "mentor",email: mentorEmail,password:passwordOfMentor,username: mentorEmail.split("@")[0]})

      if(!mentorData){

        return res.status(400).json({ success: false, message: "Mentor is not find in DB "});
      }else{

        const newGD = new gd({
          topic,
          duration,
          time:formattedTime,
          date:formattedDate,
          link:link,
          mentor: mentorData._id,
          candidates:interviewIdArray,
          interviewId: interviewID,
        });
    
        await newGD.save();
        
        
        const newRoundData = {
          roundId: newGD._id,
          name: "gd",
        };
    
        // interview
        //   .findById(interviewID)
        //   .exec()
        //   .then((foundInterview) => {
        //     if (!foundInterview) {
        //       console.error("Interview not found.");
        //     } else {
        //       foundInterview.rounds.push(newRoundData);
        //       foundInterview
        //         .save()
        //         .then((updatedInterview) => {
        //           console.log("Round added successfully:", updatedInterview);
        //         })
        //         .catch((err) => {
        //           console.error(err);
        //         });
        //     }
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });


        const sendEmailToMentor = await sendEmail(mentorData.email,"Mentor Credentials for Meet",`<h2>Username:${mentorData.username}</h2>
        <h2>Password:${mentorData.password}</h2>
        <h2>Link:   ${link}</h2> 
        <h3>Topic:  ${topic}</h3>
        <h3>Date :  ${formattedDate}</h3>
        <h3>Time :  ${formattedTime}</h3>`)

    
        if (!sendEmailToMentor) {
          console.log("email not send to mentor");
        } else {
          console.log("email sended to mentor: ", mentorEmail);  
        }
      }
    }
   


    await Promise.all(
      candidates.map(async (item, index) => {
     
        const emailToCandi = await sendEmail(
          item.email,
          "Login Credentials for Meet",
          `<h2>Username:${item.username}</h2>
          <h2>Password:${item.password}</h2>
          <h3>Link :  ${link}</h3>
          <h3>Topic:  ${topic}</h3>
          <h3>Date :  ${formattedDate}</h3>
          <h3>Time :  ${formattedTime}</h3>`
        );

        if (!emailToCandi) {
          console.log("email not sended");
        } else {
          console.log("email sended to : ",item.email);
        }

      })
    );

    res.status(200).json({ success: true, message: "Email sended to all the Candidates & Mentor."});
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }

}
