import React, { useEffect, useState } from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  TextField,
  FormLabel,
  Tooltip,
  IconButton,
  Avatar,
  Dialog,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  setQuestionType,
  setQuestionCategory,
  setQuestion,
  setQuestionImage,
  setQuestionImageURL,
  setQuestionImageDesc,
  setQuestionMarks,
  setCode,
  setCodeDescription,
} from "../../../../store/slices/SingleQuestion";
import axios from "axios";

const Question = () => {
  const dispatch = useDispatch();
  const singleQuestion = useSelector((state) => state.SingleQuestion);
  const {
    questionType,
    questionCategory,
    question,
    questionImageURL,
    questionImageDesc,
    questionMarks,
    code,
    codeDescription,
  } = singleQuestion;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Question image

  const chooseImage = (e) => {
    dispatch(setQuestionImage(e.target.files[0]));
    axios
      .post(
        "http://127.0.0.1:4000/api/create-image-link",
        {
          img: e.target.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("response", res.data.message);
        if (res.data.success === true) {
          dispatch(
            setQuestionImageURL(
              res.data.message
              // URL.createObjectURL(e.target.files[0])
            )
          );
          alert("uploaded");
        } else {
          alert("error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert("something went wrong");
      });
  };

  return (
    <>
      <FormControl>
        <Stack spacing={2}>
          {/* Question Type */}
          <Stack>
            <FormLabel focused={false}>Choose Question Type</FormLabel>
            <RadioGroup
              row
              onChange={(e) => dispatch(setQuestionType(e.target.value))}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                value="Quantitative"
                control={
                  <Radio
                    size="small"
                    checked={questionType === "Quantitative"}
                  />
                }
                label="Quantitative"
              />
              <FormControlLabel
                value="Reasoning"
                control={
                  <Radio size="small" checked={questionType === "Reasoning"} />
                }
                label="Reasoning"
              />
              <FormControlLabel
                value="Verbal"
                control={
                  <Radio size="small" checked={questionType === "Verbal"} />
                }
                label="Verbal"
              />
              <FormControlLabel
                value="Technical"
                control={
                  <Radio size="small" checked={questionType === "Technical"} />
                }
                label="Technical"
              />
            </RadioGroup>
          </Stack>

          {/* Question Category */}
          <Stack>
            <FormLabel focused={false}>Choose Question Category</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
              onChange={(e) => dispatch(setQuestionCategory(e.target.value))}
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
              <FormControlLabel
                value="Code"
                control={
                  <Radio size="small" checked={questionCategory === "Code"} />
                }
                label="Code"
              />
            </RadioGroup>
          </Stack>

          {/* Text Category */}

          {questionCategory === "Text" && (
            <Stack>
              <FormLabel focused={false}>Enter the question</FormLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                required
                size="small"
                value={question}
                onChange={(e) => dispatch(setQuestion(e.target.value))}
              />
            </Stack>
          )}

          {/* Image Category */}
          {questionCategory === "Image" && (
            <FormControl fullWidth>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center">
                  <TextField
                    type="file"
                    id="photo"
                    sx={{ display: "none" }}
                    onChange={chooseImage}
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
                    <>
                      <Avatar
                        onClick={handleOpenDialog}
                        sx={{ marginLeft: 2, cursor: "pointer" }}
                        alt="Image"
                        src={questionImageURL}
                      />
                      <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <img src={questionImageURL} alt="question image" />
                      </Dialog>
                    </>
                  )}
                </Stack>

                <Stack>
                  <FormLabel focused={false}>Enter Image Description</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={questionImageDesc}
                    onChange={(e) =>
                      dispatch(setQuestionImageDesc(e.target.value))
                    }
                  />
                </Stack>
              </Stack>
            </FormControl>
          )}

          {/* Code Category */}
          {questionCategory === "Code" && (
            <Stack spacing={2}>
              <Stack>
                <FormLabel focused={false}>Enter the code</FormLabel>
                <TextField
                  id="code"
                  multiline
                  minRows={3}
                  value={code}
                  onChange={(e) => dispatch(setCode(e.target.value))}
                />
              </Stack>
              <Stack>
                <FormLabel focused={false}>
                  Enter the code description
                </FormLabel>
                <TextField
                  id="outlined-code-description"
                  variant="outlined"
                  required
                  size="small"
                  type="text"
                  value={codeDescription}
                  onChange={(e) => dispatch(setCodeDescription(e.target.value))}
                />
              </Stack>
            </Stack>
          )}

          {/* Marks */}
          <Stack>
            <FormLabel focused={false}>
              Enter the marks for the question
            </FormLabel>
            <TextField
              id="outlined-negativemarking"
              variant="outlined"
              required
              size="small"
              type="number"
              value={questionMarks}
              onChange={(e) => dispatch(setQuestionMarks(e.target.value))}
            />
          </Stack>
        </Stack>
      </FormControl>
    </>
  );
};

export default Question;
