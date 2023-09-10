const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const AWS = require('aws-sdk')

router.use(fileUpload());

//API -> /api/client/upload
router.post('/upload',async(req,res)=>{
   
})


//1. Registration 
// API -> /api/client/registration

router.post("/registration",async(req,res)=>{

    const clientType = req.body.clienttype;
    const company = req.body.company;
    const domain = req.body.domain;
    const website = req.body.website;
    
    console.log("data",clientType,company,domain,website)

    AWS.config.update({
        accessKeyId:process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY,
        region:process.env.REGION
    })

    const s3 = new AWS.S3();

    const fileContent = Buffer.from(req.files.data.data,'binary');

    const params = {
        Bucket: 'hireginus-images',
        Key:`${new Date().getTime().toString()}`,
        Body: fileContent
    }


    s3.upload(params,(err,data)=>{
        if(err){
            throw err;
        }
        res.send({
            "response_code":200,
            "response_message":"Success",
            "response_data":data,
        });
    })

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