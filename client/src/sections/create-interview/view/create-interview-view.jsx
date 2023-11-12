import {
  Box,
  Card,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import AddCandidates from "../add-candidates";
import ViewCandidates from "../view-candidates";
import InterviewTitle from "../interview-title";
import Complete from "../complete";
import BackNext from "../back-next";
import Papa from "papaparse";
import CustomeSnackBar from "../../../utils/toast-message";
import axios from "axios";
import config from "../../../utils/config";
import Cookies from "js-cookie";

const steps = ["Add Candidates", "View Candidates", "Interview Title"];
const CreateInterviewPage = () => {
  // toast message
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // steps

  const [activeStep, setActiveStep] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // add candidates
  const [rows, setRows] = useState(null);
  const [csv, setCSV] = useState(null);

  const fileInputRef = useRef(null);

  const handleReadCSV = (e) => {
    const file = e.target.files[0];
    if (file.name.split(".")[1] !== "csv") {
      setIsOpen(true);
      setToastMessage("You can only upload CSV files in the specified format.");
      return;
    }
    setCSV(file);
    Papa.parse(e.target.files[0], {
      header: true,
      complete: (result) => {
        if (result.data.length > 0) result.data.pop();
        setRows(result.data);
        console.log(result);
      },
    });
    setIsFileUploaded(true);
    setIsOpen(true);
    setToastMessage("CSV file uploaded...");
  };

  // interview title
  const [interviewTitle, setInterviewTitle] = useState("");

  const handleCreateInterview = () => {
    if (!interviewTitle || interviewTitle.trim().length === 0) {
      setIsOpen(true);
      setToastMessage("Please enter an interview title");
      return;
    }

    const token = Cookies.get("token");

    axios
      .post(
        "http://127.0.0.1:4000/api/client/add/candidates/" + token,
        { rows, title: interviewTitle },
        config
      )
      .catch((err) => {
        setIsOpen(true);
        setToastMessage("Something went wrong. Please try again later");
        return;
      });

    setIsOpen(true);
    setToastMessage("Interview Created");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <Container>
        <Stack mb={5}>
          <Typography variant="h4"> Create Interview </Typography>
        </Stack>
        <Card sx={{ p: 4 }}>
          {activeStep != steps.length && (
            <Stepper activeStep={activeStep} sx={{ py: 4 }}>
              {steps.map((label, index) => {
                return (
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
                );
              })}
            </Stepper>
          )}
          <Box sx={{ p: 2 }}>
            {activeStep === 0 && (
              <AddCandidates
                csv={csv}
                fileInputRef={fileInputRef}
                handleReadCSV={handleReadCSV}
              />
            )}
            {activeStep === 1 && <ViewCandidates rows={rows} />}
            {activeStep === 2 && (
              <InterviewTitle
                interviewTitle={interviewTitle}
                setInterviewTitle={setInterviewTitle}
              />
            )}
            {activeStep === 3 && <Complete interviewTitle={interviewTitle} />}
            <BackNext
              steps={steps}
              activeStep={activeStep}
              isFileUploaded={isFileUploaded}
              handleBack={handleBack}
              handleNext={handleNext}
              handleCreateInterview={handleCreateInterview}
            />
          </Box>
        </Card>
      </Container>
      <CustomeSnackBar
        isOpen={isOpen}
        message={toastMessage}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default CreateInterviewPage;
