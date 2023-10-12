import { Helmet } from "react-helmet-async";
import { DataGrid } from "@mui/x-data-grid";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography, Button } from "@mui/material";
// components
import Iconify from "./components/iconify";
// sections
import AppTasks from "./sections/app/appTask";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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
  // console.log(candidates);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="candidate table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log("candidates", candidates)} */}
            {candidates.map((candidate, index) =>
              candidate.map((c, key) => (
                <TableRow key={key}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default function DashboardAppPage() {
  const theme = useTheme();
  const user = useSelector((state) => state.User);
  const [allInterviews, setAllInterviews] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  const sendEmailWithLink = (candidates) => {
    const aptLink = localStorage.getItem("AptitudeLink");
    axios
      .post(
        "http://127.0.0.1:4000/api/interview/sendemail-to-candidates",
        { aptLink, candidates },
        config
      )
      .then((res) => {})
      .catch((error) => {
        alert("error in app.jsx" + error.message);
      });
  };

  const [showCandidates, setShowCandidates] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);

  const allData = (candidates) => {
    const candidateIds = [];

    candidates.map((data) => candidateIds.push(data.candidateId));
    console.log("Here is array :" + candidateIds);
    const baseUrl = "http://127.0.0.1:4000/api/candidate/getCandidate";
    const requests = candidateIds.map((candidateId) => {
      return axios.post(baseUrl, { candidateId }, config);
    });

    const candidateAllDetails = [];

    Promise.all(requests)
      .then((res) => {
        res.forEach((re, index) => {
          console.log(re, index);
          candidateAllDetails.push(re.data.candidate);
          console.log(
            "all candidate details after request: ",
            candidateAllDetails
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setAllCandidates(candidateAllDetails);
  };

  const handleViewCandidates = (candidates) => {
    setSelectedCandidates(allCandidates);
    setShowCandidates(!showCandidates);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/api/interview/all-interviews", config)
      .then((res) => {
        console.log(res.data);
        setAllInterviews(res.data.interviews);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
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
                  {allInterviews &&
                    allInterviews.map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="right">
                          {row.candidates.length}
                        </TableCell>
                        <TableCell align="right">{row.rounds.length}</TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => handleViewCandidates(row.candidates)}
                          >
                            View candidates
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => allData(row.candidates)}>
                            View
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => sendEmailWithLink(row.candidates)}
                          >
                            Send Email
                          </Button>
                          <Button
                            onClick={() => {
                              navigate("/clientdashboard/schedule-interview");
                            }}
                          >
                            Schedule Interview
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {showCandidates && (
              <div>
                <h2>Candidates:</h2>
                {/* {console.log("selected andis", selectedCandidates)} */}
                <CandidateListTable candidates={selectedCandidates} />
              </div>
            )}
          </Grid>
        )}
      </Container>
    </>
  );
}
