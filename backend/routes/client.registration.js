const express = require('express');
const router = express.Router();
const {uploadFile}  = require('../services/uploadFileS3.service')

//1. Registration 
// API -> /api/client/registration
router.post("/registration",async(req,res)=>{

    const clientType = req.body.clienttype;
    const company = req.body.company;
    const domain = req.body.domain;
    const website = req.body.website;
    
    console.log("data",clientType,company,domain,website)

    const imgUrl = await uploadFile(req.files)

    console.log("Data : ",clientType,company,domain,website,imgUrl.Location)

    res.status(200).send({message:"Success"})

})


//2. Post plan
// API -> /api/client/post-plan
router.post("/post-plan",(req,res)=>{
    const data = req.body
    console.log("DATA : ",data)
    res.status(200).send({message:"Successfully"})
}) 


//3. Pree plan 
// API -> /api/client/pree-plan
router.post("/pree-plan",(req,res)=>{
    res.send("pree registration of client");
})


module.exports = router;