import { CircularProgress, Container } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    </>
  );
};

export default Loader;
