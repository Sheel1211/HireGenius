import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <Typography variant="body2" className="text-sm">
        Status:
        <Box
          className="font-semibold px-2 py-1 rounded-md bg-gray-100"
          sx={{
            fontWeight: "bold",
            fontSize: "0.875rem", // equivalent to text-sm
            bgcolor: "#E5E7EB",
            paddingX: 2,
            paddingY: 1,
            borderRadius: "md",
          }}
        >
          {outputDetails?.status?.description}
        </Box>
      </Typography>
      <Typography variant="body2" className="text-sm">
        Memory:
        <Box
          className="font-semibold px-2 py-1 rounded-md bg-gray-100"
          sx={{
            fontWeight: "bold",
            fontSize: "0.875rem", // equivalent to text-sm
            bgcolor: "#E5E7EB",
            paddingX: 2,
            paddingY: 1,
            borderRadius: "md",
          }}
        >
          {outputDetails?.memory}
        </Box>
      </Typography>
      <Typography variant="body2" className="text-sm">
        Time:
        <Box
          className="font-semibold px-2 py-1 rounded-md bg-gray-100"
          sx={{
            fontWeight: "bold",
            fontSize: "0.875rem", // equivalent to text-sm
            bgcolor: "#E5E7EB",
            paddingX: 2,
            paddingY: 1,
            borderRadius: "md",
          }}
        >
          {outputDetails?.time}
        </Box>
      </Typography>
    </div>
  );
};

export default OutputDetails;
