import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  MenuItem,
  Container,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledMenu } from "./Style";
import { deleteQuestion } from "../../../store/slices/AptitudeSlice";

const ShowQuestions = () => {
  const questions = useSelector((state) => state.Aptitude);
  const dispatch = useDispatch();
  const lastQuestionRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (index) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questions]);

  const handleDeleteQuestion = (index) => {
    dispatch(deleteQuestion(index));
    handleClose();
  };

  useEffect(() => {
    localStorage.setItem("Aptitude", JSON.stringify(questions));
  }, [handleDeleteQuestion]);

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

  console.log(questions);

  return (
    <>
      <Box
        sx={{
          background: "white",
          padding: 4,
          margin: 4,
          boxShadow: 2,
        }}
      >
        <Typography> Quantitative - {quantitativeCount} </Typography>
        <Typography> Reasoning - {reasoningCount} </Typography>
        <Typography> Verbal - {verbalCount} </Typography>
        <Typography> Technical - {technicalCount} </Typography>
      </Box>
      {questions &&
        questions.map((question, index) => {
          console.log(question);
          return (
            <Box
              key={index}
              sx={{
                background: "white",
                margin: 4,
                padding: 4,
                boxShadow: 2,
              }}
              ref={index === questions.length - 1 ? lastQuestionRef : null}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {question.questionImageURL ? (
                  <>
                    <Box>
                      <Typography
                        onCopy={(e) => e.preventDefault()}
                        sx={{
                          textAlign: "start",
                          fontSize: "20px",
                          paddingBottom: 1,
                          userSelect: "none",
                        }}
                      >
                        {index + 1}.
                      </Typography>
                      <img
                        src={question.questionImageURL}
                        alt="Big Image"
                        style={{
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography
                      onCopy={(e) => e.preventDefault()}
                      sx={{
                        textAlign: "start",
                        fontSize: "20px",
                        paddingBottom: 1,
                        userSelect: "none",
                      }}
                    >
                      {index + 1}. {question.question}
                    </Typography>
                  </>
                )}
                <IconButton onClick={() => handleDeleteQuestion(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>

              {question.answerType === "Radio" && (
                <>
                  <Divider />
                  <RadioGroup sx={{ my: 2 }}>
                    {question.options.map((option, index) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "start",
                          }}
                        >
                          <FormControlLabel
                            sx={{ userSelect: "none" }}
                            onCopy={(e) => e.preventDefault()}
                            value={
                              option?.optionURL
                                ? option.optionURL
                                : option.option
                            }
                            control={<Radio size="small" />}
                            label={option?.optionURL ? "" : option.option}
                            name="radio"
                          />
                          <Box>
                            {option.optionURL && (
                              <img
                                src={option.optionURL}
                                alt="Big Image"
                                style={{
                                  height: "200px",
                                  width: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </RadioGroup>
                </>
              )}

              {question.answerType === "Checkbox" && (
                <>
                  <Divider />
                  <RadioGroup sx={{ my: 2 }}>
                    {question.options.map((option, index) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "start",
                          }}
                        >
                          <FormControlLabel
                            sx={{ userSelect: "none" }}
                            onCopy={(e) => e.preventDefault()}
                            value={
                              option?.optionURL
                                ? option.optionURL
                                : option.option
                            }
                            control={<Checkbox size="small" />}
                            label={option?.optionURL ? "" : option.option}
                            name="radio"
                          />
                          <Box>
                            {option.optionURL && (
                              <img
                                src={option.optionURL}
                                alt="Big Image"
                                style={{
                                  height: "200px",
                                  width: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </RadioGroup>
                </>
              )}

              {question.answerType === "Text" && (
                <>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    rows={3}
                  />
                </>
              )}
            </Box>
          );
        })}
    </>
  );
};

export default ShowQuestions;
