import React, { useState } from "react";
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  MenuItem,
  TextField,
  Select,
  Button,
  FormLabel,
  Alert,
  Checkbox,
  Tooltip,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { PlusIcon } from "./Style";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../store/slices/AptitudeSlice";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const AddQuestion = () => {
  const [questionCategory, setQuestionCategory] = useState("Text");
  const [question, setQuestion] = useState("");
  const [questionImage, setQuestionImage] = useState("");
  const [questionImageURL, setQuestionImageURL] = useState("");
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
    // setOptions([...options, ""]);
  };

  const handleAnswers = (ans) => {
    setAnswers([...answers, ans]);
  };

  const handleOptions = (value, optionNumber) => {
    // const copy = [...options];
    options[optionNumber - 1] = value;
    setOptions(options);
  };

  const handleSubmit = () => {
    const data = {
      question,
      questionImageURL,
      options,
      answers,
      questionType,
      answerType,
    };
    dispatch(addQuestion(data));
  };

  const Option = ({ optionNumber }) => {
    const [singleOption, setSingleOption] = useState("");
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
        <Typography
          sx={{ fontFamily: "serif", textAlign: "center" }}
          variant="h5"
          component="div"
        >
          Enter the question
        </Typography>
        <Divider sx={{ marginTop: 2 }} />
      </Box>
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
        <>
          <FormLabel focused={false} sx={{ marginTop: 2 }}>
            Enter the question type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
            onChange={(e) => setQuestionCategory(e.target.value)}
          >
            <FormControlLabel
              value="Text"
              control={
                <Radio size="small" checked={questionCategory === "Text"} />
              }
              label="Text"
            />
            <FormControlLabel
              value="Image"
              control={
                <Radio size="small" checked={questionCategory === "Image"} />
              }
              label="Image"
            />
          </RadioGroup>
        </>
        {questionCategory === "Text" && (
          <>
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
          </>
        )}
        {questionCategory === "Image" && (
          <>
            <FormControl fullWidth>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <TextField
                  type="file"
                  id="photo"
                  sx={{ display: "none" }}
                  onChange={(e) => {
                    setQuestionImage(e.target.files[0]),
                      setQuestionImageURL(
                        URL.createObjectURL(e.target.files[0])
                      );
                  }}
                />
                <FormLabel htmlFor="photo">
                  <Tooltip
                    title="Choose the question"
                    placement="top-start"
                    arrow
                  >
                    <IconButton component="span" size="large">
                      <PhotoCameraIcon sx={{ width: 55, height: 55 }} />
                    </IconButton>
                  </Tooltip>
                </FormLabel>
                {questionImageURL && (
                  <Avatar
                    sx={{ marginLeft: 2 }}
                    alt="Image"
                    src={questionImageURL}
                  />
                )}
              </Box>
            </FormControl>
          </>
        )}
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

export default AddQuestion;
