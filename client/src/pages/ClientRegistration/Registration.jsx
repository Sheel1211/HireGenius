import React, { useState } from "react";
import axios from "axios";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import RegistartionSub1 from "./RegistartionSub1";
import RegistrationSub2 from "./RegistrationSub2";
import RegistrationSub3 from "./RegistrationSub3";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Fill Form', 'Upload Files', 'Review'];


// const Registration = () => {
//   const [clientData, setclientData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     url: "",
//     description: "",
//     contactno: "",
//     sector: "",
//   });
//   const [validCertificateFile, setValidCertificateFile] = useState(null);
//   const [logoFile, setLogoFile] = useState(null);

//   const handleInputChange = (e) => {
//     setclientData({ ...clientData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (name === "validcertificate") {
//       setValidCertificateFile(e.target.files[0]);
//     } else if (name === "logo") {
//       setLogoFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("clientData", clientData);
   
//     const certi = validCertificateFile;
//     const logo = logoFile;

//     console.log("certi", certi);
//     console.log("logo", logo);

//     axios
//       .post(
//         "http://127.0.0.1:4000/api/client/registration",
//         {
//           name: clientData.name,
//           email: clientData.email,
//           password: clientData.password,
//           url: clientData.url,
//           description: clientData.description,
//           contactno: clientData.contactno,
//           sector: clientData.sector,
//           validcertificate: certi,
//           logo:logo
//         },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       )
//       .then((res) => {
//         console.log("response", res.data);
//       })
//       .catch((error) => {
//         console.log("error", error);
//       });
//   };

//   return (
//       <>
//     <div>
//       Client Registration page.
//       <input
//         type="text"
//         name="name"
//         onChange={handleInputChange}
//         placeholder="Enter a name"
//       />
//       <input
//         type="text"
//         name="email"
//         onChange={handleInputChange}
//         placeholder="email"
//       />
//       <input
//         type="text"
//         name="password"
//         onChange={handleInputChange}
//         placeholder="password"
//       />
//       <input
//         type="text"
//         name="url"
//         onChange={handleInputChange}
//         placeholder="url"
//       />
//       <input
//         type="text"
//         name="description"
//         onChange={handleInputChange}
//         placeholder="description"
//       />
//       <input
//         type="number"
//         name="contactno"
//         onChange={handleInputChange}
//         placeholder="9999999999"
//       />
//       <input
//         type="text"
//         name="sector"
//         onChange={handleInputChange}
//         placeholder="sector"
//       />
//       <br></br>
//       Valid Certi:<br></br>
//       <input type="file" name="validcertificate" onChange={handleFileChange} />
//       Logo:<br></br>
//       <input type="file" name="logo" onChange={handleFileChange} />
//       <button
//                 onClick={handleSubmit}
//                 type="submit">
//                 submit
//               </button>
//     </div>
 
//     </>
//   );
// };
const Registration = ()=>{
  const [activeStep, setActiveStep] = useState(0);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword:"",
    url: "",
    description: "",
    contactno: "",
    sector: "",
  }); 

  const [validCertificateFile, setValidCertificateFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const getStepContent=(step)=>{
    switch (step) {
      case 0:
        return <RegistartionSub1 clientData={clientData} setClientData={setClientData}/>;
      case 1:
        return <RegistrationSub2 validCertificateFile={validCertificateFile} setValidCertificateFile={setValidCertificateFile} logoFile={logoFile} setLogoFile={setLogoFile}/>;
      case 2:
        return <RegistrationSub3 clientData={clientData} validCertificateFile={validCertificateFile} logoFile={logoFile}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
        // e.preventDefault();
        console.log("clientData", clientData);
       
        const certi = validCertificateFile;
        const logo = logoFile;
    
        console.log("certi", certi);
        console.log("logo", logo);
        if( !clientData.name ||!clientData.email||!clientData.password||!clientData.url||!clientData.description||!clientData.contactno||!clientData.sector){
          alert("All fields are required!")
        }else if(clientData.password !== clientData.cpassword){
          alert("Passwords are not match")
        }else if(!certi || !logo){
          alert("files are not Uploaded")
        }else{

      
          axios
          .post(
            "http://127.0.0.1:4000/api/client/registration",
            {
              name: clientData.name,
              email: clientData.email,
              password: clientData.password,
              url: clientData.url,
              description: clientData.description,
              contactno: clientData.contactno,
              sector: clientData.sector,
              validcertificate: certi,
              logo:logo
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            console.log("response", res.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
          handleNext();
        }
      };

  return (
    <>
    
    <CssBaseline />
    <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography component="h1" variant="h4" align="center">
             Registration Form
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {activeStep === steps.length ? (<>
          <Typography  variant="h5" gutterBottom color="primary">
          Thank you for registering!         
           </Typography>
          <Typography variant="subtitle1" >
          Your registration is complete. Our admin team will now review your profile. We'll notify you about the next steps soon.
              </Typography>
          </>):(<>

            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                
                  {
                  activeStep === steps.length - 1 ? 
                  <Button
                  variant="contained"
                  onClick={()=>{handleSubmit();}
                }
                  sx={{ mt: 3, ml: 1 }}> Register</Button>
                : 
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}>Next</Button>
                  }


              </Box>
          </>)}


      </Paper>
        <Copyright />
      </Container>
    </>
  );
}

export default Registration;
