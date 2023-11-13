import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

const RoundImage = ({ path, round }) => {
  return (
    <>
      <Stack gap={1} sx={{ mb: 2 }}>
        <Box
          component="img"
          alt="Aptitude"
          src={path}
          sx={{
            width: 120,
            height: 120,
            objectFit: "contain",
            cursor: "pointer",
            p: 1,
            border: "1px solid #cccccc",
            transition: "border-color 0.3s ease", // Adding a transition for a smooth effect
            "&:hover": {
              borderColor: "#2196f3", // Change border color on hover
            },
          }}
        />
        <Typography textAlign="center" variant="body1">
          {round}
        </Typography>
      </Stack>
    </>
  );
};

export default RoundImage;
