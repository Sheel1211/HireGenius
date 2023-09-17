import { Box, Card, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ThankYou = () => {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          boxShadow: 2,
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mt: 10,
        }}
      >
        <Box>
          <Typography variant="h5">
            Thank you for submitting the test.
          </Typography>
          <Typography variant="body1">You may close the window now.</Typography>
        </Box>
      </Container>
    </>
  );
};

export default ThankYou;
