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
import CandidatePage from "./candidatePage";

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
  console.log(candidates);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="candidate table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {candidate}
                </TableCell>
              </TableRow>
            ))}
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
  // const [candidates, setCandidates] = useState([]);
  const [showCandidates, setShowCandidates] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

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
        alert("erro in app.jsx");
      });
  };

  const handleViewCandidates = (candidates) => {
    setSelectedCandidates(candidates);
    setShowCandidates(!showCandidates);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/api/interview/all-interviews", config)
      .then((res) => {
        console.log(res.data);
        setAllInterviews(res.data.interviews);
      })
      .catch((err) => {
        console.log(err);
      });
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allInterviews.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}

                      // onClick={()=>sendEmailWithLink(row.candidates)
                      // }
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="right">
                        {/* {row.candidates[0].length} */}
                        hi
                      </TableCell>
                      <TableCell align="right">{row.rounds.length}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleViewCandidates(row.candidates[0])
                          }
                        >
                          View candidates
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {showCandidates && (
                    <>
                      <CandidateListTable candidates={selectedCandidates} />
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Container>
    </>
  );
}
