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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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

// CandidateListTable component for displaying candidate information
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

const DashboardAppPage = () => {
  const [allInterviews, setAllInterviews] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showCandidates, setShowCandidates] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.User);

  // Fetch all interviews and set them to the state
  const fetchInterviews = () => {
    axios
      .get("http://127.0.0.1:4000/api/interview/all-interviews", config)
      .then((res) => {
        setAllInterviews(res.data.interviews);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const allData = (candidates) => {
    const candidateIds = candidates.map((data) => data.candidateId);

    const baseUrl = "http://127.0.0.1:4000/api/candidate/getCandidate";
    const requests = candidateIds.map((candidateId) => {
      return axios.post(baseUrl, { candidateId }, config);
    });

    Promise.all(requests)
      .then((responses) => {
        const candidateAllDetails = responses.map(
          (response) => response.data.candidate
        );
        setSelectedCandidates(candidateAllDetails);
        setShowCandidates(!showCandidates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendEmailWithLink = (candidates, interviewId) => {
    const aptLink = localStorage.getItem("AptitudeLink");
    console.log(candidates);
    axios
      .post(
        "http://127.0.0.1:4000/api/interview/sendemail-to-candidates",
        { aptLink, candidates, interviewId },
        config
      )
      .then((res) => {})
      .catch((error) => {
        alert("error in app.jsx" + error.message);
      });
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome {user.User.email}
      </Typography>
      {allInterviews && (
        <Grid container spacing={3}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Candidates</TableCell>
                  <TableCell align="right">Rounds</TableCell>
                  <TableCell align="right">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allInterviews.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() =>
                        navigate("/clientdashboard/rounds", { state: row._id })
                      }
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.candidates.length}</TableCell>
                    <TableCell align="right">{row.rounds.length}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => allData(row.candidates)}>
                        View candidates
                      </Button>
                      <Button
                        onClick={() =>
                          sendEmailWithLink(row.candidates, row._id)
                        }
                      >
                        Send Email
                      </Button>
                      <Button
                        onClick={() =>
                          navigate("/clientdashboard/schedule-interview", {
                            state: row._id,
                          })
                        }
                      >
                        Schedule Interview
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {showCandidates && selectedCandidates.length > 0 && (
            <div>
              <h2>Candidates:</h2>
              <CandidateListTable candidates={selectedCandidates} />
            </div>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default DashboardAppPage;
