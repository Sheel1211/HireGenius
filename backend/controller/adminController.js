import admin from '../models/adminSchema.js'
import client from '../models/clientSchema.js'
import { sendEmail } from '../services/sendEmail.service.js'

import jwt from 'jsonwebtoken'

export const adminLogin=async(req,res)=>{
    try{
        console.log(req.body);

        const {email,password } = req.body;

        const adminData = await admin.findOne({email,password})
        console.log("adminData : ",adminData)
        if(!adminData || adminData ===  undefined || adminData === null){
            return res.status(422).send({success:false,message:"No Admin for given data"})
        }

        const authToken = jwt.sign({id:adminData._id}, process.env.JWT_KEY)
        adminData.authToken = authToken;

        await adminData.save()

        return res.status(200).send({success:true,message:"admin loggedIn succcessfully",token:authToken})

    } catch(error){
        return res.status(500).send({sucess:false,message:"Internal server error", data: error.message})
    }
}

export const getallClients = async(req,res)=>{
    try{

        const allUnverifiedClients = await client.find({});

        if(allUnverifiedClients){
            return res.status(200).send({success:true,data:allUnverifiedClients})
        }else{
            return res.status(422).send({sucess:false,message:"No unverified Clients are there"})
        }

    }catch(error){
        return res.status(500).send({sucess:false,message:"Internal server error", data: error.message})
    }
}

export const verifyClients = async(req,res)=>{
    try{
        const {clientId} = req.params;
        const clientData = await client.findOneAndUpdate({_id:clientId},{approved:true});
        if(clientData){
            return res.status(200).send({sucess:true,message:"Client is Verified successfully"})
        }else{
            return res.status(422).send({sucess:false,message:"Something went wrong!"})
        }

    }catch(error){
        return res.status(500).send({sucess:false,message:"Internal server error", data: error.message})
    }

    // const data = await sendEmail("barotpratham266@gmail.com","Demo Subject","hii this is for demo message");
    // console.log("email data : ",data)

}
