import { Container, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import Question from "./Question";
import EditorContainer from "./EditorContainer";
import { useLocation } from "react-router-dom";

const Playground = () => {
  const location = useLocation();

  const questionData = location.state;

  return (
    <React.Fragment>
      {/* <Header /> */}
      <CssBaseline />
      <Container
        sx={{
          minWidth: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2vmax",
        }}
        fixed
        disableGutters={true}
      >
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Question question={questionData} />
          </Grid>
          <Grid item xs={7}>
            <EditorContainer />
            {/* <Landing /> */}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Playground;
