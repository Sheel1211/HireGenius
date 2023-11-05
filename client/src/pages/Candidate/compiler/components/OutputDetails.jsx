import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box, Container } from "@mui/material";

const OutputDetails = ({ outputDetails }) => {
  return (
    <Container
      sx={{
        display: "flex",
        marginTop: 4,
        flexDirection: "column",
        paddingY: 3,
      }}
    >
      <Typography
        variant="body2"
        className="text-sm"
        sx={{ display: "flex", flexDirection: "row",marginTop:1 }}
      >
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

      <Typography variant="body2" className="text-sm" sx={{ display: "flex", flexDirection: "row",marginTop:1 }}>
        Memory:
        <Box
          className="font-semibold px-2 py-1 rounded-md bg-gray-100"
          sx={{
            fontWeight: "bold",
            fontSize: "0.875rem", // equivalent to text-sm
            bgcolor: "#E5E7EB",
            paddingX: 2,
            paddingY: 1,
            marginX:2,
            borderRadius:"0.5vmax"
          }}
        >
          {outputDetails?.memory}
        </Box>
      </Typography>

      <Typography variant="body2" className="text-sm" sx={{ display: "flex", flexDirection: "row",marginTop:1 }}>
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
    </Container>
  );
};

export default OutputDetails;
