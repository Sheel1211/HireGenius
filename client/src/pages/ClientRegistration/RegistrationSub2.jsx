import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const RegistrationSub2 = ({validCertificateFile, setValidCertificateFile,logoFile, setLogoFile}) => {
  //   const [validCertificateFile, setValidCertificateFile] = useState(null);
  // const [logoFile, setLogoFile] = useState(null);

  const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "validcertificate") {
          setValidCertificateFile(e.target.files[0]);
        } else if (name === "logo") {
          setLogoFile(e.target.files[0]);
        }
      };

    const seedata=()=>{
console.log(validCertificateFile,logoFile);
    }

  return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
    Upload Files
    </Typography>

    <Stack direction="row" alignItems="center" spacing={2}>
     
      <Button variant="contained" component="label">
        Upload Valid Certificate
        <input hidden  name="validcertificate" type="file" onChange={handleFileChange}/>
      </Button>

      <Button variant="contained" component="label">
        Upload Logo
        <input hidden  name="logo" type="file" onChange={handleFileChange}/>
      </Button>

    </Stack>
   
      <button onClick={seedata}>see</button>

  </React.Fragment>
  )
}

export default RegistrationSub2
