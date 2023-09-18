import candidate from "../models/candidateSchema.js";
import interview from "../models/interviewSchema.js";
import { sendEmail } from "../services/sendEmail.service.js";

export const allInterviews = async(req,res)=>{
    try{
        // console.log(req.user);
      const clientId = req.user._id;
  
      const interviews = await interview.find({client:clientId});

      res.status(200).json({success:true,interviews})
  
    }catch(error){
      
      res.status(400).json({ success: false, message: error.message });
    }
}
  
export const sendEmailToAllCandidates = async(req,res)=>{
    try{
        const {aptLink,candidates} = req.body;
        console.log(req.body)
        await Promise.all(candidates[0].map(async(item,index)=>{
            //console.log(index,"=>",item);
            const candidateData = await candidate.find({_id:item})
            // console.log(candidateData);
            // console.log("yes")
            const email = candidateData[0].email;
            const password = candidateData[0].password;
            const username  = candidateData[0].username;
            const name = candidateData[0].name;

            //console.log(email," ",password," ",username," ",name)

            const emailToCandi = await sendEmail(email,"Login Credentials",`Hii ${name}.<h2> your username:${username}</h2><h2>password:${password}</h2><h2>Test Link:${aptLink}</h2>`)

            if(!emailToCandi){
                console.log("email not sended");
                //res.status(400).json({ success: false, message:"Emails not sended to t"});
            }else{
                console.log("email sended to : ",email);
                //res.status(200).json({success:true,message:"Emails sended to the all candidates"})
            }
        }))
        res.status(200).json({success:true,message:"Email sended to all the candidates."})
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
}