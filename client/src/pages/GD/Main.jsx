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
import axios from 'axios';
import Container from "@mui/material/Container";
import Table from '@mui/joy/Table';
import { MobileTimePicker } from "@mui/x-date-pickers";
import { useLocation } from "react-router-dom";

const Main = () => {
  
 const [link,generateLink] = useState("")

  const [candidates,setcandidates] = useState([])


  const location = useLocation();
  const {interviewData} = location.state;

  const [interview,setInterview] = useState(interviewData);


  const [meetData,setMeetData]=useState({
    topic:"",
    mentorEmail:"",
    date:"",
    time:"",
    duration:"",
  })

  useEffect(()=>{
    allData(interview.candidates)
  },[])

  function convertData(inputData) {
    
    const convertedData = inputData.map((item) => ({
      _id:item[0]._id,
      email: item[0].email,
      password: item[0].password,
      username: item[0].username,
    }));
    setcandidates(convertedData)
  }

const allData = (candidates) => {
    const candidateIds = candidates.map((data) => data.candidateId);
    
    const baseUrl = "http://127.0.0.1:4000/api/candidate/getCandidate";
    const requests = candidateIds.map((candidateId) => {
      return axios.post(baseUrl, { candidateId });
    });

    
    Promise.all(requests)
      .then((responses) => {
        const candidateAllDetails = responses.map((response) => response.data.candidate);
        convertData(candidateAllDetails);
      })
      .catch((err) => {
        console.log(err);
      });

  };


  function uuidv4() {
    return 'xxyxyxxyx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }


  const handleGenerateLink =()=>{
    if(!link || link==="" ||link===null || link===undefined){
      const roomId =uuidv4() 
      generateLink(`http://localhost:4000/api/gd/meet/${roomId}`);
    }else{
     alert("Already generated!")
    }
  } 

  const handleScheduleMeet = ()=>{
    console.log("Meet Data : ",meetData,link,candidates)

    axios.post("http://127.0.0.1:4000/api/gd/schedule/meet",{topic:meetData.topic,mentorEmail:meetData.mentorEmail,date:meetData.date,time:meetData.time,duration:meetData.duration,link:link,candidates:candidates,interviewID:interview._id}).then((res)=>{

    if(res.status===200){
      console.log("response : ",res)
      alert(res.data.message)
    }
    }).catch((error)=>{
      console.log(error)
      alert("something went wrong!")
    })
  }
  return (
    <React.Fragment>
      <Box
        id="hero"
        sx={{
          backgroundColor: "background.paper",
          position: "relative",
          pt: 4,
          pb: { xs: 8, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={0}
            sx={{ flexDirection: { xs: "column", md: "unset" } }}
          >
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  textAlign: { xs: "center", md: "left" },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography
                    component="h2"
                    sx={{
                      position: "relative",
                      fontSize: { xs: 40, md: 72 },
                      letterSpacing: 1.5,
                      fontWeight: "bold",
                      lineHeight: 1.3,
                    }}
                  >
                    <Typography
                      component="mark"
                      sx={{
                        position: "relative",
                        color: "primary.main",
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        backgroundColor: "unset",
                      }}
                    >
                      Schedule{" "}
                      <Box
                        sx={{
                          position: "absolute",
                          top: { xs: 24, md: 34 },
                          left: 2,
                          transform: "rotate(3deg)",
                          "& img": {
                            width: { xs: 146, md: 210 },
                            height: "auto",
                          },
                        }}
                      >
                        {/* eslint-disable-next-line */}
                        <img
                          src="/images/headline-curve.svg"
                          alt="Headline curve"
                        />
                      </Box>
                    </Typography>
                    Meet{" "}
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        position: "relative",
                        "& svg": {
                          position: "absolute",
                          top: -16,
                          right: -21,
                          width: { xs: 22, md: 30 },
                          height: "auto",
                        },
                      }}
                    >
                      <svg version="1.1" viewBox="0 0 3183 3072">
                        <g id="Layer_x0020_1">
                          <path
                            fill="#1976D2"
                            d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363,-2496 207,-247 570,-287 806,-89z"
                          />
                          <path
                            fill="#1976D2"
                            d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718,-1018 212,-73 437,39 500,250z"
                          />
                          <path
                            fill="#1976D2"
                            d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                          />
                        </g>
                      </svg>
                    </Typography>{" "}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

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
                onChange={(e)=>{setMeetData({...meetData,topic:e.target.value})}}
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
                onChange={(e)=>{setMeetData({...meetData,mentorEmail:e.target.value})}}
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
          'TimePicker',
          'MobileTimePicker',
          'DesktopTimePicker',
          'StaticTimePicker',
        ]}
      >
        
        <DemoItem>
          <MobileTimePicker defaultValue={dayjs('2023-12-30T15:30')}
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
                onChange={(e)=>{setMeetData({...meetData,duration:e.target.value})}}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
            <Button variant="contained" onClick={handleGenerateLink}>
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
<Box sx={{m:6}}>
        <Table aria-label="basic table" borderAxis="xBetween" 
  color="neutral"
  size="md"
  stickyFooter
  stickyHeader
  variant="plain">
      <thead>
        <tr>
          <th>No</th>
          <th>Email</th>
          <th>Username</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((value,index)=>{
          return(<tr key={index}>
            <td>{index}</td>
            <td>{value.email}</td>
            <td>{value.username}</td>
            <td>{value.password}</td>
          </tr>)
        })}
      </tbody>
    </Table>
    </Box>
    <Grid item xs={12} sm={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 900,
                  p:2
                }}
              >
               <Button variant="contained"  onClick={handleScheduleMeet}>
                Send Email to All
              </Button>
              </Box>
              
            </Grid>
  

      </Paper>
    </React.Fragment>
  );
};

export default Main;
