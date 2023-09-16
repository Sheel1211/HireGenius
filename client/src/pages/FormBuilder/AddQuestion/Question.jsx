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
} from "../../../store/slices/SingleQuestion";

const Question = () => {
  const dispatch = useDispatch();
  const singleQuestion = useSelector((state) => state.SingleQuestion);
  const {
    questionType,
    questionCategory,
    question,
    questionImageURL,
    questionImageDesc,
  } = singleQuestion;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <FormControl>
        <FormLabel focused={false}>Question Type</FormLabel>
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
              <Radio size="small" checked={questionType === "Quantitative"} />
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
            control={<Radio size="small" checked={questionType === "Verbal"} />}
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
              onChange={(e) => dispatch(setQuestion(e.target.value))}
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
                    dispatch(setQuestionImage(e.target.files[0])),
                      dispatch(
                        setQuestionImageURL(
                          URL.createObjectURL(e.target.files[0])
                        )
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
              </Box>
              <FormLabel sx={{ marginTop: 2 }} focused={false}>
                Enter Image Description
              </FormLabel>
              <TextField
                variant="outlined"
                size="small"
                value={questionImageDesc}
                onChange={(e) => dispatch(setQuestionImageDesc(e.target.value))}
              />
            </FormControl>
          </>
        )}
      </FormControl>
    </>
  );
};

export default Question;
