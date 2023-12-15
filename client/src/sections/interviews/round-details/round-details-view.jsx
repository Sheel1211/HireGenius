import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomeSnackBar from "../../../utils/toast-message";
// import CandidatesReadCSV from "../../create-interview/candidates-read-csv";
// import { dummyCSVData } from "../../../utils/dummy-csv-data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsActivateLinkDialogOpen } from "../../../store/slices/DialogSlice";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  setEndTime,
  setIsActiveLinkIsuueOccurs,
  setNegativeMarking,
  setStartTime,
  setTestDuration,
} from "../../../store/slices/AptiDashboard";
import dayjs from "dayjs";

const RoundDetailsView = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const roundDetails = location.state;

  const handleCopy = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setIsCopied(true);
        setMessage("Link copied...");
      })
      .catch((error) => {
        setIsCopied(true);
        setMessage("Error while copying link to clipboard");
      });
  };

  // close toast message
  const handleClose = () => {
    setIsCopied(false);
    dispatch(setIsActiveLinkIsuueOccurs(false));
  };

  // view candidates
  const [isVCOpen, setIsVCOpen] = useState(false);
  const [allCandidates, setAllCandidates] = useState([]);
  const [isVCLoading, setIsVCLoading] = useState(true);

  const handleViewCandidates = () => {
    const candidateIds = roundDetails.candidates.map(
      (candidate) => candidate.candidateId
    );

    setIsVCOpen(true);
    axios
      .post("http://localhost:4000/api/candidate/getallcandidates", {
        candidateIds,
      })
      .then((res) => {
        const data = res.data.candidates.map((candidate, index) => {
          return {
            id: index + 1,
            name: candidate.name,
            email: candidate.email,
          };
        });
        setAllCandidates(data);
        setIsVCLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVCDialogClose = () => {
    setIsVCOpen(false);
  };

  // activate test link
  const dispatch = useDispatch();
  const DialogSlice = useSelector((state) => state.DialogSlice);
  const AptiDashboard = useSelector((state) => state.AptiDashboard);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const handleActivateLinkDialogOpen = () => {
    dispatch(setIsActivateLinkDialogOpen(true));
  };

  const handleActivateLinkDialogClose = () => {
    dispatch(setIsActivateLinkDialogOpen(false));
  };

  const handleActivateLink = () => {
    if (AptiDashboard.endTime <= AptiDashboard.startTime) {
      dispatch(setIsActiveLinkIsuueOccurs(true));
      setMessage("Please select valid time limit");
      return;
    }

    const data = {
      aptitudeId: roundDetails.aptitudeId,
      startTime: AptiDashboard.startTime,
      endTime: AptiDashboard.endTime,
      testDuration: AptiDashboard.testDuration,
      negativeMarking: AptiDashboard.negativeMarking,
    };

    axios
      .post("http://localhost:4000/api/set/aptitudelink/duration", data)
      .then((res) => {
        // localStorage.setItem(roundDetails.aptitudeId + "-isActive", true);
        localStorage.setItem(
          roundDetails.aptitudeId + "-startTime",
          AptiDashboard.startTime.format("DD/MM/YYYY HH:mm:ss A")
        );
        localStorage.setItem(
          roundDetails.aptitudeId + "-endTime",
          AptiDashboard.endTime.format("DD/MM/YYYY HH:mm:ss A")
        );
        dispatch(setIsActivateLinkDialogOpen(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const startTestInterval = setInterval(() => {
      const currentTime = dayjs();
      const startTime = localStorage.getItem(
        roundDetails.aptitudeId + "-startTime"
      );

      if (currentTime.format("DD/MM/YYYY HH:mm:ss A") === startTime) {
        localStorage.setItem(roundDetails.aptitudeId + "-isActive", true);
        setIsTestStarted(true);
        clearInterval(startTestInterval);
      }
    }, 1000);

    return () => clearInterval(startTestInterval);
  }, []);

  useEffect(() => {
    const endTestInterval = setInterval(() => {
      const currentTime = dayjs();
      const endTime = localStorage.getItem(
        roundDetails.aptitudeId + "-endTime"
      );

      if (currentTime.format("DD/MM/YYYY HH:mm:ss A") === endTime) {
        setIsTestStarted(false);
        localStorage.removeItem(roundDetails.aptitudeId + "-isActive");
        localStorage.removeItem(roundDetails.aptitudeId + "-startTime");
        localStorage.removeItem(roundDetails.aptitudeId + "-endTime");
        clearInterval(endTestInterval);

        // call api which makes isCompleted true in aptitude

        axios
          .patch("http://localhost:4000/api/complete/aptitude", {
            aptitudeId: roundDetails.aptitudeId,
          })
          .then((res) => {
            console.log(res);
            setIsTestCompleted(res.data.aptitude.isCompleted);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 1000);

    return () => clearInterval(endTestInterval);
  }, []);

  // setIsTestStarted at reload
  useEffect(() => {
    if (localStorage.getItem(roundDetails.aptitudeId + "-isActive") === true) {
      setIsTestStarted(true);
    }
  }, []);

  // update round details
  const [isUpdateAptiLoading, setIsUpdateAptiLoading] = useState(true);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  useEffect(() => {
    console.log("Hi");

    axios
      .get("http://localhost:4000/api/aptitude/details/" + roundDetails._id)
      .then((res) => {
        console.log(res);
        const updatedAptiDetails = res.data.aptitude;
        roundDetails.isCompleted = updatedAptiDetails.isCompleted;
        setIsUpdateAptiLoading(false);
        setIsTestCompleted(roundDetails.isCompleted);
      })
      .catch((error) => {
        console.log(error);
        setIsUpdateAptiLoading(false);
      });
  }, [isTestStarted]);

  console.log(roundDetails);

  return (
    <>
      <Container>
        <Stack direction="row" justifyContent="space-between" mb={5}>
          <Typography
            variant="h4"
            sx={{ cursor: "pointer" }}
            onClick={() => window.history.back()}
          >
            {roundDetails.roundNumber} - {roundDetails.round.name}
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Card sx={{ p: 4 }}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="body1">
                    You can view all the candidates by clicking{" "}
                    <strong>View Candidates </strong> Button.
                  </Typography>
                  <Stack direction="row">
                    <Button
                      color="inherit"
                      variant="contained"
                      onClick={handleViewCandidates}
                    >
                      View Candidates
                    </Button>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography>
                    You can send emails to all candidates.
                  </Typography>
                  <Typography>
                    Email contians Username, Password and Test link.
                  </Typography>
                  <Stack direction="row" mt={1}>
                    <Button color="inherit" variant="contained">
                      Send Mail
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography variant="body1">
                    Here is the{" "}
                    <strong> {roundDetails.round.name} link... </strong>
                  </Typography>
                {console.log("Round details: ",roundDetails)}
                  <TextField
                    id="test-link"
                    multiline
                    value={roundDetails.testLink}
                    disabled
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => handleCopy(roundDetails.testLink)}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Stack>
                <Stack spacing={1}>
                  {/* <Typography>
                    You can activate the test link by clicking
                    <strong> Active Link </strong> Button.
                  </Typography> */}
                  <Stack spacing={2} alignItems="start">
                    {isUpdateAptiLoading ? (
                      <>
                        <Skeleton variant="rounded" width="100%" height={50} />
                      </>
                    ) : (
                      <>
                        {!isTestCompleted && (
                          <Button
                            color="inherit"
                            variant="contained"
                            onClick={handleActivateLinkDialogOpen}
                          >
                            Active Link
                          </Button>
                        )}
                        {isTestCompleted && (
                          <>
                            <Typography variant="h5">
                              You have completed the {roundDetails.round.name}{" "}
                              test.
                            </Typography>
                            <Button color="inherit" variant="contained">
                              Generate Result
                            </Button>
                          </>
                        )}
                      </>
                    )}
                    {isTestStarted && (
                      <Stack>
                        <Typography variant="h6">Test is started...</Typography>
                        <Typography variant="body1">
                          Start Time -{" "}
                          {localStorage.getItem(
                            roundDetails.aptitudeId + "-startTime"
                          )}
                        </Typography>
                        <Typography variant="body1">
                          End Time -{" "}
                          {localStorage.getItem(
                            roundDetails.aptitudeId + "-endTime"
                          )}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* activate link dialog */}

      <Dialog
        open={DialogSlice.isActivateLinkDialogOpen}
        onClose={handleActivateLinkDialogClose}
      >
        <DialogTitle textAlign="center" id="link-activate">
          {"Set Limit"}
        </DialogTitle>
        <DialogContent>
          <Stack width={400} spacing={3} sx={{ px: 4, py: 1 }}>
            <TextField
              id="negative-marking"
              label="Negative Marking (percentage)"
              variant="outlined"
              type="number"
              value={AptiDashboard.negativeMarking}
              onChange={(e) => dispatch(setNegativeMarking(e.target.value))}
            />
            <TextField
              id="text-duration"
              label="Test Duration (minutes)"
              variant="outlined"
              type="number"
              value={AptiDashboard.testDuration}
              onChange={(e) => dispatch(setTestDuration(e.target.value))}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Start Time"
                  value={AptiDashboard.startTime}
                  onChange={(time) => dispatch(setStartTime(time))}
                  format="DD/MM/YYYY HH:mm:ss A"
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="End Time"
                  value={AptiDashboard.endTime}
                  onChange={(time) => dispatch(setEndTime(time))}
                  format="DD/MM/YYYY HH:mm:ss A"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleActivateLinkDialogClose}
            color="inherit"
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            onClick={handleActivateLink}
            color="inherit"
          >
            Active
          </Button>
        </DialogActions>
      </Dialog>

      {/* toast message */}

      <CustomeSnackBar
        isOpen={isCopied}
        message={message}
        handleClose={handleClose}
        duration={1000}
      />

      <CustomeSnackBar
        isOpen={AptiDashboard.isActiveLinkIsuueOccurs}
        message={message}
        handleClose={handleClose}
        duration={1000}
      />

      {/* <CustomeSnackBar  /> */}

      {/* view candidates dialog box */}

      <Dialog
        open={isVCOpen}
        onClose={handleVCDialogClose}
        aria-labelledby="view-candidates"
        aria-describedby="view-candidates-dialog"
      >
        {allCandidates && (
          <TableContainer sx={{ minWidth: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">SN</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isVCLoading ? (
                  <>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell align="left">
                        <Skeleton variant="rectangular" height={30} />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton variant="rectangular" height={30} />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton variant="rectangular" height={30} />
                      </TableCell>
                    </TableRow>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell align="left">
                        <Skeleton variant="rectangular" height={30} />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton variant="rectangular" height={30} />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton variant="rectangular" height={30} />
                      </TableCell>
                    </TableRow>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell align="left">
                        <Skeleton variant="rectangular" height={30} />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton variant="rectangular" height={30} />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton variant="rectangular" height={30} />
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  <>
                    {allCandidates.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align="left">{row.id}</TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Dialog>
    </>
  );
};

export default RoundDetailsView;
