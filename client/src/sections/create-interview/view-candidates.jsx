import { Box } from "@mui/material";
import React from "react";
import CandidatesReadCSV from "./candidates-read-csv";

const ViewCandidates = ({ rows }) => {
  return (
    <>
      <Box>
        <CandidatesReadCSV rows={rows} />
      </Box>
    </>
  );
};

export default ViewCandidates;
