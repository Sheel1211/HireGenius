const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const AWS = require("aws-sdk");
router.use(fileUpload());

//Upload File on Amazon S3 Bucket
const uploadFile = async (files) => {
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });

  const s3 = new AWS.S3();

  const fileContent = Buffer.from(files.data.data, "binary");

  const params = {
    Bucket: "hireginus-images",
    Key: `${new Date().getTime().toString()}`,
    Body: fileContent,
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { uploadFile };
