// import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { useLocation } from "react-router-dom";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Main = () => {
  const [link, generateLink] = useState("");

  const [candidates, setcandidates] = useState([]);

  const location = useLocation();
  const { interviewDetails } = location.state;

  console.log(location.state);

  const [interview, setInterview] = useState(interviewDetails);

  const [meetData, setMeetData] = useState({
    topic: "",
    mentorEmail: "",
    date: "",
    time: "",
    duration: "",
  });

  useEffect(() => {
    allData(interview.candidates);
  }, []);

  function convertData(inputData) {
    const convertedData = inputData.map((item) => ({
      _id: item[0]._id,
      email: item[0].email,
      password: item[0].password,
      username: item[0].username,
    }));
    setcandidates(convertedData);

    console.log(convertedData);
  }

  const allData = (candidates) => {
    const candidateIds = candidates.map((data) => data.candidateId);

    const baseUrl = "http://127.0.0.1:4000/api/candidate/getCandidate";
    const requests = candidateIds.map((candidateId) => {
      return axios.post(baseUrl, { candidateId });
    });

    Promise.all(requests)
      .then((responses) => {
        console.log(responses);
        const candidateAllDetails = responses.map(
          (response) => response.data.candidate
        );
        // console.log(candidateAllDetails);
        convertData(candidateAllDetails);
        // setcandidates(candidateAllDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function uuidv4() {
  //   return 'xxyxyxxyx'.replace(/[xy]/g, function (c) {
  //       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //       return v.toString(16);
  //   });
  // }

  const handleGenerateLink = () => {
    if (
      !meetData.topic ||
      !meetData.mentorEmail ||
      !meetData.date ||
      !meetData.time ||
      !meetData.duration
    ) {
      alert("First feel the form!");
      return;
    }
    const newdate = new Date(meetData.date);

    // Extract date
    const year = newdate.getFullYear();
    const month = newdate.getMonth() + 1; // Months are zero-based
    const day = newdate.getDate();

    const formattedDate = `${year}-${month}-${day}`;

    if (!link || link === "" || link === null || link === undefined) {
      generateLink(
        `http://localhost:4000/api/gd/meet/${interview._id}?date=${formattedDate}&duration=${meetData.duration}`
      );
    } else {
      alert("Already generated!");
    }
  };

  const handleScheduleMeet = () => {
    console.log("Meet Data : ", meetData, link, candidates);

    axios
      .post("http://127.0.0.1:4000/api/gd/schedule/meet", {
        topic: meetData.topic,
        mentorEmail: meetData.mentorEmail,
        date: meetData.date,
        time: meetData.time,
        duration: meetData.duration,
        link: link,
        candidates: candidates,
        interviewID: interview._id,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("response : ", res);
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("something went wrong!");
      });
  };

  console.log(candidates);

  return (
    <React.Fragment>
      <Stack spacing={4} sx={{ p: 4 }}>
        <Typography variant="h4">Create GD</Typography>

        <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
          <Box sx={{ padding: 5 }}>
            {/* <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Krunch Media
          </Typography> */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Topic
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="topic"
                  name="topic"
                  label="topic"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={meetData.topic}
                  onChange={(e) => {
                    setMeetData({ ...meetData, topic: e.target.value });
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Mentor Email
                </InputLabel>
              </Grid>

              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="mentorEmail"
                  name="mentorEmail"
                  label="email"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={meetData.mentorEmail}
                  onChange={(e) => {
                    setMeetData({ ...meetData, mentorEmail: e.target.value });
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Date
                </InputLabel>
              </Grid>

              <Grid item xs={12} sm={10}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "DatePicker",
                      "MobileDatePicker",
                      "DesktopDatePicker",
                      "StaticDatePicker",
                    ]}
                  >
                    <DemoItem>
                      <DatePicker
                        //value={meetData.date}
                        defaultValue={dayjs("10/02/2023")}
                        onChange={(newDate) => {
                          setMeetData({ ...meetData, date: newDate });
                        }}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Time
                </InputLabel>
              </Grid>

              <Grid item xs={12} sm={10}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "TimePicker",
                      "MobileTimePicker",
                      "DesktopTimePicker",
                      "StaticTimePicker",
                    ]}
                  >
                    <DemoItem>
                      <MobileTimePicker
                        defaultValue={dayjs("2023-12-30T15:30")}
                        onChange={(newTime) => {
                          setMeetData({ ...meetData, time: newTime });
                        }}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              {/*  */}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Duration
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="duration"
                  name="duration"
                  label="duration in minute"
                  fullWidth
                  type="number"
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={meetData.duration}
                  onChange={(e) => {
                    setMeetData({ ...meetData, duration: e.target.value });
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleGenerateLink}
                >
                  Generate
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="duration"
                  name="duration"
                  label="Generaet link"
                  fullWidth
                  value={link}
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12} sm={2}>
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "center",
                fontWeight: 900,
              }}
            >
              All Candidates
            </InputLabel>
          </Grid>
          <Box sx={{ m: 6 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((value, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{value.email}</TableCell>
                      <TableCell>{value.username}</TableCell>
                      <TableCell>{value.password}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {/* <Table
            aria-label="basic table"
            borderAxis="xBetween"
            color="neutral"
            size="md"
            stickyFooter
            stickyHeader
            variant="plain"
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{value.email}</td>
                    <td>{value.username}</td>
                    <td>{value.password}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table> */}
          </Box>
          <Grid item xs={12} sm={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                fontWeight: 900,
                p: 2,
              }}
            >
              <Button
                variant="contained"
                color="inherit"
                onClick={handleScheduleMeet}
              >
                Send Email
              </Button>
            </Box>
          </Grid>
        </Paper>
      </Stack>
    </React.Fragment>
  );
};

export default Main;
