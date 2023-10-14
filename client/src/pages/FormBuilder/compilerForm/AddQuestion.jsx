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
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useDispatch } from "react-redux";
import { addCodingQuestion } from "../../../store/slices/CodingSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const AddQuestion = () => {
  const dispatch = useDispatch();

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
    duration: "",
  });
  const [questionsList, setQuestionsList] = useState([]);

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
    setQuestion({ ...question, difficulty: event.target.value });
  };

  const handleQuestionAdd = () => {
    if (!question.problemStatement || !tc.input || !tc.output || !question.duration) {
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
      duration: "",
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

  return (
    <>
      <Container sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingY: 1 }}>
          <Typography variant="h6">Enter Problem Statement</Typography>
          <Textarea
            minRows={2}
            minCols={1}
            sx={{ minWidth: "40vmax" }}
            onChange={(event) => handleInputChange("problemStatement", event.target.value)}
            value={question.problemStatement}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingY: 1 }}>
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
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingY: 1 }}>
          <Typography variant="h6">Select Difficulty</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="Difficulty"
              name="difficulty"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <FormControlLabel value="easy" control={<Radio />} label="Easy" />
              <FormControlLabel value="medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="hard" control={<Radio />} label="Hard" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingY: 1 }}>
          <Typography variant="h6">Enter duration(mins)</Typography>
          <TextField
            label="Duration"
            variant="outlined"
            type="number"
            onChange={(event) => handleInputChange("duration", event.target.value)}
            value={question.duration}
          />
        </Box>


        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", paddingY: 1 }}>
          <Button variant="contained" color="primary" onClick={handleQuestionAdd}>
            Add Question
          </Button>
          <Button variant="contained" color="primary">
            Generate Link
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AddQuestion;
