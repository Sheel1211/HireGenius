import interview from "../models/interviewSchema.js";

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
        
    }catch(err){
        res.status(400).json({ success: false, message: err.message });

    }
}