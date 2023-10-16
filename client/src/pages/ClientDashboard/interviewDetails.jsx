import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};

const CandidateListTable = ({ candidates }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="candidate table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((candidate, index) => (
            <TableRow key={index}>
              <TableCell>{candidate[0].name}</TableCell>
              <TableCell>{candidate[0].email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const interviewDetails = () => {
  const [allRounds, setAllRounds] = useState([]);
  const [interview, setInterview] = useState();
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showCandidates, setShowCandidates] = useState(false);
  const [loading,setLoading]=useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.User);
  const location = useLocation();

  const interviewId = location.state;
  
  // Fetch all rounds and set them to the state
  const fetchRounds = () => {
      console.log("interviewId " + interviewId)
    axios
      .get(
        `http://127.0.0.1:4000/api/interview/all-rounds/${interviewId}`,
        config
      )
      .then((res) => {
        // console.log(res.data.interview.rounds)
        setAllRounds(res.data.interview.rounds);
        setInterview(res.data.interview);
        setLoading(!loading);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  return (
    <Container maxWidth="xl">
      {loading ? (
        <CircularProgress variant="determinate" value={75} />
      ) : (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            {interview.title}
          </Typography>
          {allRounds && (
            <Grid container spacing={3}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Round</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell align="right">Round_Id</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allRounds.map((row, index) => (
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
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.roundId}</TableCell>
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

export default interviewDetails;
