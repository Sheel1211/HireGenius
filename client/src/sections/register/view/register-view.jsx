import React, { useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import { Box, Card, Stack, Link as MuiLink, Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import RegistrationSub1 from "../registration-sub1";
import RegistrationSub2 from "../registration-sub2";
import RegistrationSub3 from "../registration-sub3";
import LoadingButton from "@mui/lab/LoadingButton";
import { bgGradient } from "../../../theme/css";
import { alpha, useTheme } from "@mui/material/styles";
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import { useNavigate } from "react-router-dom";
const steps = ["Fill Form", "Upload Files", "Review"];
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RenderForm = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    url: "",
    description: "",
    contactno: "",
    sector: "private",
  });

  const [validCertificateFile, setValidCertificateFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <RegistrationSub1
            clientData={clientData}
            setClientData={setClientData}
          />
        );
      case 1:
        return (
          <RegistrationSub2
            validCertificateFile={validCertificateFile}
            setValidCertificateFile={setValidCertificateFile}
            logoFile={logoFile}
            setLogoFile={setLogoFile}
          />
        );
      case 2:
        return (
          <RegistrationSub3
            clientData={clientData}
            validCertificateFile={validCertificateFile}
            logoFile={logoFile}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    // e.preventDefault();

    const certi = validCertificateFile;
    const logo = logoFile;

    if (
      !clientData.name ||
      !clientData.email ||
      !clientData.password ||
      !clientData.url ||
      !clientData.description ||
      !clientData.contactno ||
      !clientData.sector
    ) {
      const message = "All fields are required!";
      toast.warn(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else if (clientData.password !== clientData.cpassword) {
      const message = "Passwords are not match";
      toast.warn(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else if (!certi || !logo) {
      const message = "files are not Uploaded";
      toast.warn(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
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
            logo: logo,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .catch((error) => {
          const message = error.response.data.message;
          toast.warn(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        });
      handleNext();
    }
  };

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {activeStep === 0 && (
            <>
              <Typography variant="h4">Register in to HireGenius</Typography>

              <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                Already have an account?
                <MuiLink
                  variant="subtitle2"
                  sx={{ ml: 0.5, cursor: "pointer" }}
                  onClick={handleLogin}
                >
                  Login
                </MuiLink>
              </Typography>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  OR
                </Typography>
              </Divider>
            </>
          )}

          {activeStep !== steps.length && (
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      style: {
                        color: activeStep === index ? "black" : "grey",
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          )}

          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom color="primary">
                Thank you for registering!
              </Typography>
              <Typography variant="subtitle1">
                Your registration is complete. Our admin team will now review
                your profile. We'll notify you about the next steps soon.
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <LoadingButton
                    color="inherit"
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Back
                  </LoadingButton>
                )}

                {activeStep === steps.length - 1 ? (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="inherit"
                    size="large"
                    onClick={() => {
                      handleSubmit();
                    }}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {" "}
                    Register
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    size="large"
                    type="submit"
                    variant="contained"
                    color="inherit"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </LoadingButton>
                )}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

const RegisterView = () => {
  const theme = useTheme();

  return (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: "/assets/background/overlay_4.jpg",
          }),
          height: 1,
        }}
      >
        {/* <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        /> */}
      </Box>
      <RenderForm />
    </Scrollbar>
  );
};

export default RegisterView;
