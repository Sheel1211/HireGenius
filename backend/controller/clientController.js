import { uploadFile } from "../services/uploadFileS3.service.js";
import client from "../models/clientSchema.js";

export const clientRegistration = async(req, res) => {
  
  try{
    const { name, email, password, url, description, contactno, sector } = req.body;
    if (!name ||!email ||!password ||!url ||!description ||!contactno ||!sector ||!req.files.validcertificate ||!req.files.logo){
      return res.status(400).send({ message: "All fields are required!" });
    } else {

      const clientExist = await client.findOne({email:email})
      if(clientExist){
        return res.status(422).send({message:"Client Already registered"})
      }else{

      // console.log("data : ",name);
      // console.log(email);
      // console.log(password);
      // console.log(url);
      // console.log(description);
      // console.log(contactno);
      // console.log(sector);
  
      const certificate = await uploadFile(req.files.validcertificate,`${name}_Certi`);
      const logoData = await uploadFile(req.files.logo, `${name}_Logo`);
  
      const validcertificate = certificate.Location;
      const logo = logoData.Location;
  
      // console.log("validcertificate : ",validcertificate,"logo : ",logo);
  
      const clientData = client.create({ name, email, password, url, description, contactno, sector,
      validcertificate: { url: validcertificate },
      logo: { url: logo }

    })
       return res.status(200).send({success:true, message: "Client registered"});
      }

    }

  }catch(error){
    //console.log("error occurred : ",error);
    return res.status(500).send({success:false, message:"Internal Server Error"})
  } 
};

export const clientProfileUpdate = async(req,res)=>{

  try{
    const { name, email, password, url, description, contactno, sector } = req.body;
    if (!name ||!email ||!password ||!url ||!description ||!contactno ||!sector ||!req.files.validcertificate ||!req.files.logo){
      return res.status(400).send({ message: "All fields are required!" });
    } else {
      const clientExist = await client.findOne({email:email})
      if(clientExist){
        
        const certificate = await uploadFile(req.files.validcertificate,`${name}_Certi`);
        const logoData = await uploadFile(req.files.logo, `${name}_Logo`);
    
        const validcertificate = certificate.Location;
        const logo = logoData.Location;

        const clientData = client.findOneAndUpdate({ name, email, password, url, description, contactno, sector,
        validcertificate: { url: validcertificate },
        logo: { url: logo }
      })
         return res.status(200).send({success:true, message: "Client Updated successfully."});
      }else{
        return res.status(422).send({message:"Client not found"})
      }
    }

  }catch(error){
    return res.status(500).send({success:false, message:"Internal Server Error"})
  }
}

export const getClientData = async(req,res)=>{
    try{
      const {clientId} = req.params;
      const clientData = await client.findById({_id:clientId})     
       if(clientData){
        return res.status(200).send({data:clientData,success:true});
      }else{
        return res.status(422).send({message:"No Client with this email"})
      }
    }catch(error){
      return res.status(500).send({success:false, message:"Internal Server Error"}) 
    }
}