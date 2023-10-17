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
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
  const { codingId } = params;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSolveChallenge = (row)=>{
    navigate("/solve/coding",{state : row});
  }


  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:4000/api/coding/getQuestions/${codingId}`, config)
      .then((res) => {
        console.log(res.data);
        setRound(res.data.codingRound);
        setQuestions(res.data.codingRound.questions);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [codingId, dispatch]);

  return (
    <Container maxWidth="xl">
      {loading ? (
        <CircularProgress variant="determinate" value={75} />
      ) : (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
          </Typography>
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
                          <Button onClick={()=>handleSolveChallenge(row)}>Solve Challenge</Button>
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
