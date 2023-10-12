import { Helmet } from "react-helmet-async";
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

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function DashboardAppPage() {
  const theme = useTheme();
  const user = useSelector((state) => state.User);
  const [allInterviews, setAllInterviews] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();
  const sendEmailWithLink = (candidates) => {
    const aptLink = localStorage.getItem("AptitudeLink");
    // console.log(candidates)

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
                  {allInterviews.map((row) => (
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
          </Grid>
        )}
      </Container>
    </>
  );
}
