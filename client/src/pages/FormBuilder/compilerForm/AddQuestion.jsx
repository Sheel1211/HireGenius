import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogActions,
  Slide,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useDispatch } from "react-redux";
import { addCodingQuestion } from "../../../store/slices/CodingSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};

const toastWarning = (message) => {
  toast.warn(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

const AddQuestion = (interviewId) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = useState(60);

  const [link, setLink] = useState(null);
  const [linkmodal, setLinkModal] = useState(false);

  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [tc, setTc] = useState({
    input: "",
    output: "",
  });
  const [question, setQuestion] = useState({
    problemStatement: "",
    testcases: {
      input: "",
      output: "",
    },
    difficulty: selectedDifficulty,
  });

  const [questionsList, setQuestionsList] = useState([]);
  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
    setQuestion({ ...question, difficulty: event.target.value });
  };
  
  const handleQuestionAdd = () => {
    if (!question.problemStatement.trim() || !tc.input.trim() || !tc.output.trim()) {
      toastWarning("Please fill all the fields");
      return;
    }

    // Update the question object with the test cases
    question.testcases = tc;

    setQuestionsList([...questionsList, question]);
    dispatch(addCodingQuestion(question));

    // Reset the form
    setQuestion({
      problemStatement: "",
      testcases: {
        input: "",
        output: "",
      },
      difficulty: selectedDifficulty,
    });
    setTc({
      input: "",
      output: "",
    });
  };

  const handleInputChange = (field, value) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [field]: value,
    }));
  };

  const handleDuration = () => {
    if (questionsList.length === 0) {
      toast.warn("Please add some questions...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGenerateLink = () => {
    const codingid = localStorage.getItem("codingid");
    const data = {
      questions: questionsList,
      duration: time,
      interviewId
    };

    axios
      .post("http://localhost:4000/api/coding/create", data, config)
      .then((res) => {
        console.log(res);
        setLink(res.data.codingLink);
        setLinkModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  // TO copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Link copied to clipboard: ' + link);
      })
      .catch(error => {
        console.error('Error copying link to clipboard: ', error);
      });
      setLinkModal(false)
      navigate("/clientdashboard")
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  
  return (
    <>
    {linkmodal && (
        <Dialog
          maxWidth="md"
          open={linkmodal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ my: 2 }}>
              Copy Link
            </Typography>
            <TextField
              fullWidth
              label="Copy link"
              variant="outlined"
              value={link}
            />
          </Box>
          <DialogActions>
            <Button onClick={() => setLinkModal(false)}>Close</Button>
            <Button onClick={handleCopyLink}>Copy</Button>
          </DialogActions>
        </Dialog>
      )}
      <Container
        sx={{ display: "flex", flexDirection: "column", width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingY: 1,
          }}
        >
          <Typography variant="h6">Enter Problem Statement</Typography>
          <Textarea
            minRows={2}
            minCols={1}
            sx={{ minWidth: "40vmax" }}
            onChange={(event) =>
              handleInputChange("problemStatement", event.target.value)
            }
            value={question.problemStatement}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingY: 1,
          }}
        >
          <Typography variant="h6">Enter Testcases</Typography>
          <Typography variant="h6">INPUT</Typography>
          <TextField
            multiline
            minRows={2}
            sx={{ minWidth: "40vmax" }}
            onChange={(event) => setTc({ ...tc, input: event.target.value })}
            value={tc.input}
          />
          <Typography variant="h6">OUTPUT</Typography>
          <TextField
            multiline
            minRows={2}
            sx={{ minWidth: "40vmax" }}
            onChange={(event) => setTc({ ...tc, output: event.target.value })}
            value={tc.output}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingY: 1,
          }}
        >
          <Typography variant="h6">Select Difficulty</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="Difficulty"
              name="difficulty"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <FormControlLabel
                value="easy"
                control={<Radio />}
                label={<Chip label="Easy" color="success" />}
              />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label={<Chip label="Medium" color="warning" />}
              />
              <FormControlLabel
                value="hard"
                control={<Radio />}
                label={<Chip label="Hard" color="error" />}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingY: 1,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleQuestionAdd}
          >
            Add Question
          </Button>
          <Button variant="contained" color="primary" onClick={handleDuration}>
            Generate Link
          </Button>
        </Box>
      </Container>
      <Dialog
        maxWidth="md"
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ p: 4 }}>
          <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
              Select Coding Duration in Minutes
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
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleGenerateLink}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddQuestion;
