import {
  Button,
  Card,
  Container,
  Dialog,
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
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomeSnackBar from "../../../utils/toast-message";
import CandidatesReadCSV from "../../create-interview/candidates-read-csv";
import { dummyCSVData } from "../../../utils/dummy-csv-data";
import axios from "axios";

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
                  <Typography>
                    You can start the test by clicking
                    <strong> Start Test </strong> Button.
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button color="inherit" variant="contained">
                      Start Test
                    </Button>
                    <Button color="inherit" variant="contained">
                      Extend Test
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* toast message */}
      <CustomeSnackBar
        isOpen={isCopied}
        message={message}
        handleClose={handleClose}
        duration={1000}
      />

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
