import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

const OutputDetails = ({ outputDetails }) => {
  return (
    <Box
      sx={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="body2" className="text-sm">
          Status:
        </Typography>
        <Box
          className="font-semibold px-2 py-1 rounded-md bg-gray-100"
          sx={{
            fontWeight: "bold",
            fontSize: "0.875rem",
            bgcolor: "#E5E7EB",
            paddingX: 2,
            paddingY: 1,
            borderRadius: "md",
          }}
        >
          {outputDetails?.status?.description}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="body2" className="text-sm">
          Memory:
        </Typography>
        <Box
          className="font-semibold px-2 py-1 rounded-md bg-gray-100"
          sx={{
            fontWeight: "bold",
            fontSize: "0.875rem",
            bgcolor: "#E5E7EB",
            paddingX: 2,
            paddingY: 1,
            borderRadius: "md",
          }}
        >
          {outputDetails?.memory}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="body2" className="text-sm">
          Time:
        </Typography>
        <Box
          className="font-semibold px-2 py-1 rounded-md bg-gray-100"
          sx={{
            fontWeight: "bold",
            fontSize: "0.875rem",
            bgcolor: "#E5E7EB",
            paddingX: 2,
            paddingY: 1,
            borderRadius: "md",
          }}
        >
          {outputDetails?.time}
        </Box>
      </Box>
    </Box>
  );
};

export default OutputDetails;
