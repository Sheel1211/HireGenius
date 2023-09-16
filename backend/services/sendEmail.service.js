
import nodemailer from 'nodemailer'

export const sendEmail=async(clientEmail,subjectData,message)=>{
console.log("send email",clientEmail,subjectData,message);
     // connect with the smtp server
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let details = {
    from: "hiregenius.co.in@gmail.com",
    to: clientEmail,
    subject: subjectData,
    html: `<h2>${message}</h2>`,
  };

  return new Promise((resolve,reject)=>{

    transporter.sendMail(details, async (err) => {
        if (err) {
          reject(err.message);
        } else {
          try {
            resolve({message:"Email sent successfully",success:true});
        } catch (error) {
            reject({message:"email not sent!",success:false});
          }
        }

      });
})



}