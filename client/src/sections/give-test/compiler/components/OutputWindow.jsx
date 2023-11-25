import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // Compilation error
      return (
        <Typography
          variant="body2"
          sx={{
            px: 2,
            py: 1,
            fontWeight: "normal",
            fontSize: "0.75rem", // equivalent to text-xs
            color: "error.main", // Use Material-UI's color palette for error
          }}
        >
          {atob(outputDetails?.compile_output)}
        </Typography>
      );
    } else if (statusId === 3) {
      return (
        <Typography
          variant="body2"
          sx={{
            px: 2,
            py: 1,
            fontWeight: "normal",
            fontSize: "0.75rem", // equivalent to text-xs
            color: "success.main", // Use Material-UI's color palette for success
          }}
        >
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </Typography>
      );
    } else if (statusId === 5) {
      return (
        <Typography
          variant="body2"
          sx={{
            px: 2,
            py: 1,
            fontWeight: "normal",
            fontSize: "0.75rem", // equivalent to text-xs
            color: "error.main", // Use Material-UI's color palette for error
          }}
        >
          {"Time Limit Exceeded"}
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="body2"
          sx={{
            px: 2,
            py: 1,
            fontWeight: "normal",
            fontSize: "0.75rem", // equivalent to text-xs
            color: "error.main", // Use Material-UI's color palette for error
          }}
        >
          {atob(outputDetails?.stderr)}
        </Typography>
      );
    }
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: "1.25rem",
          bgClip: "text",
          color: "#1E88E5",
          marginBottom: 2,
        }}
      >
        Output
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          height: "10rem",
          bgcolor: "#1E293B",
          borderRadius: "md",
          color: "common.white",
          fontWeight: "normal",
          fontSize: "0.875rem", // equivalent to text-sm
          overflowY: "auto",
        }}
      >
        {outputDetails ? <>{getOutput()}</> : null}
      </Paper>
    </>
  );
};

export default OutputWindow;
