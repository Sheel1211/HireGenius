import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  FormControl,
  Dialog,
  DialogActions,
  TextField,
} from "@mui/material";
import Question from "./Question";
import Answer from "./Answer";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../../store/slices/AptitudeSlice";
import validateSingleQuestion from "./validateSingleQuestion";
import { clearQuestion } from "../../../store/slices/SingleQuestion";
import axios from "axios";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const index = () => {
  // It will show the popup when you reload the page
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = "";
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const dispatch = useDispatch();
  const singleQuestion = useSelector((state) => state.SingleQuestion);
  const [isQuestionAdded, setIsQuestionAdded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = useState(60);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (validateSingleQuestion(singleQuestion)) {
      dispatch(addQuestion(singleQuestion));
      dispatch(clearQuestion());
      setIsQuestionAdded(true);
    }
    // console.log(singleQuestion);
  };
  const questions = useSelector((state) => state.Aptitude);

  const handleDuration = () => {
    setOpen(true);
  };

  const handleGenerateLink = () => {
    const data = {
      aptitudeId: "81c3f02d-ef1b-452d-a7ae-afe0a9c108a5",
      questions,
      duration: time,
    };

    axios
      .patch("http://localhost:4000/api/saveQuestions", data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 1,
          background: "white",
          padding: 3,
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h5" component="div">
          Enter the question
        </Typography>
        <Divider sx={{ marginTop: 2 }} />
      </Box>
      <FormControl fullWidth sx={{ padding: 4 }}>
        <Question />
        <Answer isQuestionAdded={isQuestionAdded} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Button
            fullWidth
            type="submit"
            sx={{ marginTop: 2 }}
            size="medium"
            variant="contained"
            onClick={handleSubmit}
          >
            Add Question
          </Button>
          <Button
            fullWidth
            type="submit"
            sx={{ marginTop: 2 }}
            size="medium"
            variant="contained"
            onClick={handleDuration}
          >
            Generate Link
          </Button>
        </Box>
      </FormControl>
      <Dialog
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            Select Aptitude Duration in Minutes
          </Typography>
          <TextField
            fullWidth
            label="Time (in minutes)"
            variant="outlined"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleGenerateLink}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default index;
