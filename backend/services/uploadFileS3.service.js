import express from 'express';
const router = express.Router();
import fileUpload from 'express-fileupload';
import AWS from 'aws-sdk'
router.use(fileUpload());

//Upload File on Amazon S3 Bucket
export const uploadFile = async(file,fileName)=>{
    AWS.config.update({
        accessKeyId:process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY,
        region:process.env.REGION
    })

    const s3 = new AWS.S3();
    const fileContent = Buffer.from(file.data,'binary');
    const params = {
        Bucket: 'hireginus-images',
        Key:`${new Date().getTime().toString()}`+`_${fileName}`,
        Body: fileContent
    }
    return new Promise((resolve,reject)=>{
        s3.upload(params,(err,data)=>{
            if(err){
                reject(err);
            }else{
                 resolve(data);
            }
        })
    })
}
