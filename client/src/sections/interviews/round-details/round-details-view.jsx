import {
  Button,
  Card,
  Container,
  Dialog,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomeSnackBar from "../../../utils/toast-message";
import CandidatesReadCSV from "../../create-interview/candidates-read-csv";

const RoundDetailsView = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const roundDetails = location.state;
  console.log(roundDetails);

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
  const handleViewCandidates = () => {};

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
                    <Button color="inherit" variant="contained">
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
        fullScreen={200}
        open={isVCOpen}
        onClose={handleVCDialogClose}
        aria-labelledby="view-candidates"
        aria-describedby="view-candidates-dialog"
      >
        {/* <CandidatesReadCSV rows={rows} /> */}
      </Dialog>
    </>
  );
};

export default RoundDetailsView;
