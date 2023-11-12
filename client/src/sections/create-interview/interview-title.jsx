import { Box, TextField } from "@mui/material";
import React, { useState } from "react";

const InterviewTitle = ({ interviewTitle, setInterviewTitle }) => {
  return (
    <>
      <Box>
        <TextField
          fullWidth
          id="interview-title"
          label="Interview Title"
          variant="outlined"
          value={interviewTitle}
          onChange={(e) => setInterviewTitle(e.target.value)}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "black",
              },
          }}
        />
      </Box>
    </>
  );
};

export default InterviewTitle;
