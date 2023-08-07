import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Select,
  Button,
  FormLabel,
  Alert,
  Checkbox,
} from "@mui/material";
import { PlusIcon } from "../Style";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../../store/slices/AptitudeSlice";

const Text = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionType, setQuestionType] = useState("");
  const [answerType, setAnswerType] = useState("None");
  const [showOption, setShowOption] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const handleAddOption = () => {
    if (showOption.length + 1 > 4) {
      setShowAlert(true);
      return;
    }
    const newOption = (
      <Option
        key={showOption.length + 1}
        optionNumber={showOption.length + 1}
      />
    );
    setShowOption([...showOption, newOption]);
  };

  const handleAnswers = (ans) => {
    setAnswers([...answers, ans]);
  };

  const handleOptions = (value, optionNumber) => {
    options[optionNumber-1] = value;
    setOptions(options)
    console.log(options);
  };

  const handleSubmit = () => {
    const data = { question, options, answers, questionType, answerType };
    dispatch(addQuestion(data));
  };

  console.log(options);

  const Option = ({ optionNumber }) => {
    const [singleOption, setSingleOption] = useState("");
    console.log("Single option: ", singleOption);
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          label="Additional Text"
          value={singleOption}
          onChange={(e) => {
            setSingleOption(e.target.value);
            handleOptions(e.target.value, optionNumber);
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 2,
          }}
        >
          <RadioGroup row>
            <FormControlLabel
              value="Correct"
              control={<Checkbox size="small" color="success" />}
              label="Correct"
              onClick={() => handleAnswers(singleOption)}
            />
          </RadioGroup>
        </Box>
      </Box>
    );
  };
  return (
    <>
      <FormControl
        sx={{
          padding: 4,
          textAlign: "start",
        }}
      >
        <FormLabel focused={false}>Question Type</FormLabel>
        <RadioGroup
          row
          onChange={(e) => setQuestionType(e.target.value)}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            value="Quantitative"
            control={<Radio size="small" />}
            label="Quantitative"
          />
          <FormControlLabel
            value="Logical Reasoning"
            control={<Radio size="small" />}
            label="Logical Reasoning"
          />
          <FormControlLabel
            value="Verbal"
            control={<Radio size="small" />}
            label="Verbal"
          />
          <FormControlLabel
            value="Domain"
            control={<Radio size="small" />}
            label="Domain"
          />
        </RadioGroup>
        <FormLabel sx={{ marginTop: 2 }} focused={false}>
          Enter the question
        </FormLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          required
          size="small"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <FormLabel focused={false} sx={{ marginTop: 2 }}>
          Enter the answer type
        </FormLabel>
        <FormControl>
          <Select
            size="small"
            value={answerType}
            onChange={(e) => setAnswerType(e.target.value)}
          >
            <MenuItem value="None"> None </MenuItem>
            <MenuItem value="Radio">Radio</MenuItem>
            <MenuItem value="Checkbox">Checkbox</MenuItem>
            <MenuItem value="Text">Text</MenuItem>
          </Select>
        </FormControl>
        {answerType !== "Text" && (
          <Button
            size="small"
            variant="contained"
            sx={{
              marginTop: 2,
              maxWidth: "10vw",
            }}
            onClick={handleAddOption}
            endIcon={<PlusIcon />}
          >
            Option
          </Button>
        )}
        {showAlert && (
          <Alert severity="error" size="small">
            Can't add more than 4 options
          </Alert>
        )}

        <Box>{showOption.map((option) => option)}</Box>

        <Button
          type="submit"
          sx={{ marginTop: 2 }}
          variant="contained"
          onClick={handleSubmit}
        >
          Add Question
        </Button>
      </FormControl>
    </>
  );
};

export default Text;
