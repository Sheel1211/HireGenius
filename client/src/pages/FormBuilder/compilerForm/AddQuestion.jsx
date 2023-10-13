import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useDispatch } from "react-redux";
import { addCodingQuestion } from "../../../store/slices/CodingSlice";

const AddQuestion = () => {
  const dispatch = useDispatch();
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
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
    setQuestionsList([...questionsList, question]);
    dispatch(addCodingQuestion(question));
    setQuestion({
      problemStatement: "",
      testcases: {
        input: "",
        output: "",
      },
      difficulty: selectedDifficulty,
      duration: "",
    });
  };

  const handleInputChange = (field, value) => {
    setQuestion({
      ...question,
      [field]: value,
    });
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
          <TextField  // Use TextField for input test cases
            multiline
            minRows={2}
            sx={{ minWidth: "40vmax" }}
            onChange={(event) => handleInputChange("testcases.input", event.target.value)}
            value={question.testcases.input}
          />
          <Typography variant="h6">OUTPUT</Typography>
          <TextField  // Use TextField for output test cases
            multiline
            minRows={2}
            sx={{ minWidth: "40vmax" }}
            onChange={(event) => handleInputChange("testcases.output", event.target.value)}
            value={question.testcases.output}
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
          <Typography variant="h6">Enter duration</Typography>
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
