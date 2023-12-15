import {
  CircularProgress,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    withCredentials: true,
  };

const InterviewResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roundDetails = location.state;
  const [results, setResults] = useState();
  const roundId = roundDetails.id;
  const roundType = roundDetails.type;
  const [loading,setLoading]=useState(true);

  const fetchResults = () => {
    if (roundType == "Coding") {
      axios
        .post(
          `http://localhost:4000/api/coding/viewresults`,
          { codingId: roundId },
          config
        )
        .then((res) => {
          console.log(res.data);
          setResults(res.data.results.results)
          setLoading(!loading);
        })
        .catch((e) => console.log(e));
    } else if (roundType == "Aptitude") {
    } else if (roundType == "GD") {
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <Container maxWidth="xl">
      {loading ? (
        <CircularProgress variant="determinate" value={75} />
      ) : (
        <>
          {results && (
            <Grid container spacing={3}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr.No</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Marks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((row, index) => (
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
                          {row.email}
                        </TableCell>
                        <TableCell>{row.marks}</TableCell>
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

export default InterviewResults;
