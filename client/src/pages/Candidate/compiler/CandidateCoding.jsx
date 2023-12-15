import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  CircularProgress,
  Chip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCurrentQuestion,
  updateCorrectlyAnsweredQuestions,
} from "../../../store/slices/CodingDashboard";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};

const CandidateCoding = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [round, setRound] = useState();
  const [duration, setDuration] = useState();
  const { codingId } = params;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(0);
  

  const handleSolveChallenge = (row) => {
    dispatch(setCurrentQuestion(row));
    navigate("/solve/coding", { state: row });
  };

  const correctlyAnsweredQuestions = useSelector(
    (state) => state.CodingDashboard.correctlyAnsweredQuestions
  );

  const storedCorrectlyAnsweredQuestions = JSON.parse(localStorage.getItem("correctlyAnsweredQuestions")) || [];
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`http://localhost:4000/api/coding/getQuestions/${codingId}`, config)
  //     .then((res) => {
  //       console.log(res.data);
  //       setDuration(res.data.codingRound.duration);
  //       setRound(res.data.codingRound);
  //       setQuestions(res.data.codingRound.questions);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //     });
  // }, [codingId, dispatch]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/api/coding/getQuestions/${codingId}`, config)
      .then((res) => {
        console.log(res.data);
        const codingRound = res.data.codingRound;
        setDuration(codingRound.duration);
        setRound(codingRound);
        setQuestions(codingRound.questions);

        // Check if there's a remaining time in local storage
        const storedRemainingTime = parseInt(localStorage.getItem("remainingTime"), 10) || codingRound.duration;
        setRemainingTime(storedRemainingTime);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [codingId, dispatch]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("remainingTime", newTime.toString());

          if (newTime <= 0) {
            clearInterval(timer);
            navigate("/coding/thank-you");
          }

          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [duration, navigate]);


  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Container maxWidth="xl">
      {loading ? (
        <CircularProgress variant="determinate" value={75} />
      ) : (
        <>
        <Typography variant="h4" sx={{ mb: 5 }}>
            Time Remaining: {formatTime(remainingTime)}
          </Typography>
          <Typography variant="h4" sx={{ mb: 5 }}></Typography>
          {questions && (
            <Grid container spacing={3}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Index</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Difficulty</TableCell>
                      <TableCell>Marks</TableCell>
                      <TableCell>Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.map((row, index) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                          backgroundColor:
                            storedCorrectlyAnsweredQuestions &&
                            storedCorrectlyAnsweredQuestions.includes(row._id)
                              ? "rgba(76, 175, 80, 0.1)"
                              : "inherit",
                          color:
                            storedCorrectlyAnsweredQuestions &&
                            storedCorrectlyAnsweredQuestions.includes(row._id)
                              ? "white"
                              : "inherit",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell>
                          {row.difficulty === "easy" ? (
                            <Chip label="Easy" color="success" />
                          ) : row.difficulty === "medium" ? (
                            <Chip label="Medium" color="warning" />
                          ) : (
                            <Chip label="Hard" color="error" />
                          )}
                        </TableCell>

                        <TableCell component="th" scope="row">
                          {row.marks}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Button onClick={() => handleSolveChallenge(row)}>
                            Solve Challenge
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default CandidateCoding;
