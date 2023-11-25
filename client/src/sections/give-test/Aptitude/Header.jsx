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
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const AptiDetails = useSelector((state) => state.AptiDashboard);
  const UserDetails = useSelector((state) => state.User);
  // console.log(UserDetails.User);
  const initialTime = AptiDetails.duration * 60;

  const calculateGrades = () => {
    let right = 0;
    let total = 0;
    const sections = AptiDetails.sections;
    const negativeMarking = AptiDetails.negativeMarking;
    for (let section in sections) {
      const sectionArr = sections[section];
      sectionArr.forEach((value, index) => {
        const {
          selectedOptions,
          answers: correctAnswers,
          options,
          questionMarks,
        } = value;
        const selectedAnswers = selectedOptions.map(
          (selectedOptionIdx) => options[selectedOptionIdx].option
        );

        const isCorrect = correctAnswers.every((correctAnswer) =>
          selectedAnswers.includes(correctAnswer)
        );

        if (selectedAnswers.length > 0) {
          if (isCorrect) {
            right += Number(questionMarks);
          } else {
            console.log("questionMarks", questionMarks);
            let negative = (Number(questionMarks) * negativeMarking) / 100;
            right -= negative;
          }
        }

        console.log(questionMarks);
        total += Number(questionMarks);
      });
    }

    console.log(right, total);

    return { right, total };
  };

  const handleSubmitTest = () => {
    // localStorage.setItem(`${params.aptitudeId}`, "4");
    // dispatch(setSelectedPage("4"));
    const { right, total } = calculateGrades();

    // console.log(UserDetails);
    const data = {
      aptitudeId: params.aptitudeId,
      candidateId: UserDetails.User._id,
      isRejected: false,
      gain: right,
      total,
    };

    // console.log(data);
    // make post request to store score of the candidate in aptitude schema
    axios
      .patch("http://127.0.0.1:4000/api/submit", data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(setSelectedPage("4"));
    localStorage.setItem(`${params.aptitudeId}`, "4");
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
