import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar, Button, Grid } from "@mui/material";
import { center } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPage } from "../../../store/slices/AptiDashboard";
import { useParams } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";

const Header = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const AptiDetails = useSelector((state) => state.AptiDashboard);
  const initialTime = AptiDetails.duration * 60;

  const calculateGrades = () => {
    let right = 0;
    let total = AptiDetails.questions.length;
    const sections = AptiDetails.sections;
    console.log(sections);
    for (let section in sections) {
      const sectionArr = sections[section];
      sectionArr.forEach((value, index) => {
        const { selectedOptions, answers: correctAnswers, options } = value;
        const selectedAnswers = selectedOptions.map(
          (selectedOptionIdx) => options[selectedOptionIdx].option
        );

        const isCorrect = correctAnswers.every((correctAnswer) =>
          selectedAnswers.includes(correctAnswer)
        );

        if (isCorrect) {
          right++;
        }
      });
    }

    console.log(right, total);
  };

  const handleSubmitTest = () => {
    localStorage.setItem(`${params.aptitudeId}`, "4");
    dispatch(setSelectedPage("4"));
    calculateGrades();
  };

  const onTimeExpired = () => {
    localStorage.setItem(`${params.aptitudeId}`, "4");
    dispatch(setSelectedPage("4"));
  };

  return (
    <AppBar position="sticky" sx={{ boxShadow: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container spacing={1} columns={20}>
            <Grid item xs={8}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Avatar
                  sx={{ bgcolor: "white", color: "#2196f3", mr: 2 }}
                  alt="Jay Patel"
                >
                  <Typography
                    variant="body"
                    sx={{
                      cursor: "pointer",
                      fontFamily: "cursive",
                    }}
                  >
                    HG
                  </Typography>
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "monospace", mr: 2 }}
                >
                  HI... Username
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              xs={12}
            >
              <Box>
                <Typography
                  textAlign="center"
                  variant="h6"
                  sx={{ fontFamily: "monospace" }}
                >
                  <CountdownTimer
                    initialTime={initialTime}
                    onTimeExpired={onTimeExpired}
                  />
            
                </Typography>
              </Box>
              <Box sx={center}>
                <Button
                  variant="contained"
                  sx={{
                    color: "black",
                    background: "white",
                    ":hover": { background: "lightgray", color: "black" },
                  }}
                  onClick={handleSubmitTest}
                >
                  Submit Test
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
