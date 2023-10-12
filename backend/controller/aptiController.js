import Aptitude from "../models/aptitudeSchema.js";
import { v4 as  uuidv4 } from "uuid";
import { uploadFile } from "../services/uploadFileS3.service.js";

export const saveQuestions = async (req, res) => {
  try {
    // Save all the question
    console.log("yes in save qiestions")
    const { aptitudeId, questions, duration } = req.body;
    
    // console.log("aptitudeId",aptitudeId,"duration",duration)
        
    console.log("Questions : ",questions)

    console.log("images : ",req.files);


    // const aptitude = await Aptitude.findOne({ aptitudeId: aptitudeId });

    // // console.log("Hi", aptitude);
    // // console.log("first");
    // aptitude.questions = questions;
    // aptitude.duration = duration;
    // await aptitude.save();
    
    // // Generate Link logic
    // const AptitudeLink = `http://localhost:5173/aptitude/${aptitudeId}`;
    // // console.log("link",AptitudeLink)

    // res
    //   .status(200)
    //   .json({ success: true, message: "Question added", AptitudeLink });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createAptitude = async (req, res) => {
  try {
    const aptitudeId = uuidv4();
    const newAptitude = await Aptitude({ aptitudeId });
    await newAptitude.save();
    res.status(200).json({
      success: true,
      aptitude: newAptitude,
      message: "Aptitude created",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAptitudeQuestions = async (req, res) => {
  try {
    const { aptitudeId } = req.params;
    const aptitude = await Aptitude.findOne({ aptitudeId });
    if (!aptitude) {
      throw new Error("No Aptitude Record Found");
    }
    const { questions, duration } = aptitude;
    res.status(200).json({
      success: true,
      questions,
      duration,
      message: "Aptitude created",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const candidateLogin = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Login successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const isValidAptitude = async (req, res, next) => {
  try {
    const { aptitudeId } = req.params;
    // console.log("params",req.params);
    const validAptitude = await Aptitude.findOne({ aptitudeId });
    // console.log(req.params);
    // console.log("params",req.params);
    // console.log(validAptitude);
    if (!validAptitude) {
      throw new Error("Not a valid aptitude link");
    }
    res.status(200).json({
      success: true,
      message: "Valid aptitude",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createImageLink = async(req,res)=>{
    const image = req.files.img;
    // console.log(image);

    try{
      const uploadImage = await uploadFile(image, `${image.name}_${image.size}`);
      // console.log("upload image : ",uploadImage)
      if(uploadImage){
      const uploadImageLocation = uploadImage.Location;
        // console.log("upload image : ",uploadImageLocation)

        return res.status(200).send({ success: true, message:uploadImageLocation});
      
      }else{
        return res.status(400).send({ success: false, message:"file not uploaded"});
      }
    }catch{
      return res.status(400).send({ success: false, message:"something went wrong!"});

    }
    
}

