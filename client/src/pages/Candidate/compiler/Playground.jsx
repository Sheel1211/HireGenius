import React, { useEffect, useState } from "react";
import { Container, CssBaseline, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "./Question";
import EditorContainer from "./EditorContainer";

const Playground = () => {
  const location = useLocation();
  const questionData = location.state;
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRemainingTime = parseInt(localStorage.getItem("remainingTime"), 10) || questionData.duration;
    setRemainingTime(storedRemainingTime);

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1;
        localStorage.setItem("remainingTime", newTime.toString());

        if (newTime <= 0) {
          clearInterval(timer);
          navigate("/coding/thank-you")
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [questionData]);

  return (
    <React.Fragment>
      <CssBaseline />
          <Typography variant="h4" sx={{ mt: 2,ml:6 }}>
            Time Remaining: {formatTime(remainingTime)}
          </Typography>
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
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export default Playground;
