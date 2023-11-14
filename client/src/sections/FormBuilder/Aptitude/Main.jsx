import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AddQuestion from "./AddQuestion";
import ShowQuestions from "./ShowQuestions";
import { useLocation } from "react-router-dom";
import Scrollbar from "../../../components/scrollbar";
import { useSelector } from "react-redux";
import CustomeSnackBar from "../../../utils/toast-message";

const Main = () => {
  const location = useLocation();
  const interviewId = location.state;
  const questions = useSelector((state) => state.Aptitude);

  const quantitativeCount = questions.reduce((count, obj) => {
    if (obj.questionType === "Quantitative") {
      return count + 1;
    }
    return count;
  }, 0);

  const reasoningCount = questions.reduce((count, obj) => {
    if (obj.questionType === "Reasoning") {
      return count + 1;
    }
    return count;
  }, 0);

  const verbalCount = questions.reduce((count, obj) => {
    if (obj.questionType === "Verbal") {
      return count + 1;
    }
    return count;
  }, 0);

  const technicalCount = questions.reduce((count, obj) => {
    if (obj.questionType === "Technical") {
      return count + 1;
    }
    return count;
  }, 0);

  // toast message
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // show questions
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Container>
        <Stack spacing={4}>
          <Typography variant="h4">Create Aptitude</Typography>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mr: 6 }}>
              <Card sx={{ p: 4 }}>
                <AddQuestion
                  interviewId={interviewId}
                  setIsOpen={setIsOpen}
                  setToastMessage={setToastMessage}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Card sx={{ p: 4 }}>
                <Stack spacing={1}>
                  <Typography>Quantitative - {quantitativeCount} </Typography>
                  <Typography> Reasoning - {reasoningCount} </Typography>
                  <Typography> Verbal - {verbalCount} </Typography>
                  <Typography> Technical - {technicalCount} </Typography>
                </Stack>
                <Button
                  color="inherit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => setIsDialogOpen(true)}
                >
                  Show Questions
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ShowQuestions />
      </Dialog>

      <CustomeSnackBar
        isOpen={isOpen}
        message={toastMessage}
        handleClose={() => setIsOpen(false)}
        duration={4000}
      />
    </>
  );
};

export default Main;
