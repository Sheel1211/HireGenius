import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const RoundImage = ({
  path,
  round,
  setIsDialogOpen,
  interview,
  allRounds,
  interviewDetails,
}) => {
  const navigate = useNavigate();
  const handleCreateRound = () => {
    // console.log(round);
    // console.log(interview);

    navigate("/create/aptitude", {
      state: {
        interviewId: interview._id,
        allRounds,
        interviewDetails,
      },
    });
    setIsDialogOpen(false);
  };
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
          onClick={handleCreateRound}
        />
        <Typography textAlign="center" variant="body1">
          {round}
        </Typography>
      </Stack>
    </>
  );
};

export default RoundImage;
