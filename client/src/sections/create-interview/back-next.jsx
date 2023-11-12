import { Box, Button, Typography } from "@mui/material";
import React from "react";

const BackNext = ({
  steps,
  activeStep,
  isFileUploaded,
  handleBack,
  handleNext,
  handleCreateInterview,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 6 }}>
        {activeStep != steps.length && (
          <Button
            color="inherit"
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        )}
        <Box sx={{ flex: "1 1 auto" }} />
        {activeStep === 0 && (
          <Button
            onClick={handleNext}
            color="inherit"
            variant="contained"
            disabled={!isFileUploaded}
          >
            Next
          </Button>
        )}
        {activeStep === 1 && (
          <Button onClick={handleNext} color="inherit" variant="contained">
            Next
          </Button>
        )}
        {activeStep === 2 && (
          <Button
            onClick={handleCreateInterview}
            color="inherit"
            variant="contained"
          >
            Create Interview
          </Button>
        )}
      </Box>
    </>
  );
};

export default BackNext;
