import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";

const RegistrationSub2 = ({
  validCertificateFile,
  setValidCertificateFile,
  logoFile,
  setLogoFile,
}) => {
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "validcertificate") {
      setValidCertificateFile(e.target.files[0]);
    } else if (name === "logo") {
      setLogoFile(e.target.files[0]);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Files
      </Typography>

      <Stack alignItems="center" spacing={2}>
        <LoadingButton
          size="large"
          color="inherit"
          variant="contained"
          component="label"
          sx={{ width: 200, padding: 1, margin: 2 }}
        >
          Upload Certificate
          <input
            hidden
            name="validcertificate"
            type="file"
            onChange={handleFileChange}
          />
        </LoadingButton>
        {validCertificateFile ? (
          <Typography variant="" gutterBottom>
            {validCertificateFile.name}
          </Typography>
        ) : (
          ""
        )}

        <LoadingButton
          size="large"
          color="inherit"
          variant="contained"
          component="label"
          sx={{ width: 200, padding: 1, margin: 2 }}
        >
          Upload Logo
          <input hidden name="logo" type="file" onChange={handleFileChange} />
        </LoadingButton>
        {logoFile ? (
          <Typography variant="" gutterBottom>
            {logoFile.name}
          </Typography>
        ) : (
          ""
        )}
      </Stack>
    </React.Fragment>
  );
};

export default RegistrationSub2;
