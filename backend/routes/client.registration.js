const express = require('express');
const router = express.Router();
const {uploadFile}  = require('../services/uploadFileS3.service')
const fileUpload = require('express-fileupload');
router.use(fileUpload());

//1. Registration 
// API -> /api/client/registration
router.post("/registration",async(req,res)=>{

    const clientType = req.body.client;    
    const imgUrl = await uploadFile(req.files)
    console.log("Data : ",clientType,imgUrl.Location)

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