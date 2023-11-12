import { Typography } from "@mui/material";
import React from "react";

const Complete = ({ interviewTitle }) => {
  return (
    <>
      <Typography sx={{ mt: 2, mb: 1 }} variant="h5" textAlign="center">
        All steps completed.
      </Typography>
      <Typography sx={{ mt: 2, mb: 1 }} variant="h5" textAlign="center">
        You created interview - {interviewTitle}
      </Typography>
    </>
  );
};

export default Complete;
