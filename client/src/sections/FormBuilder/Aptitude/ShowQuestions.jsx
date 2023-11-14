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
  Stack,
  Grid,
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

  return (
    <>
      {questions &&
        questions.map((question, index) => {
          console.log(question);
          return (
            <Stack
              key={index}
              sx={{
                margin: 4,
              }}
              ref={index === questions.length - 1 ? lastQuestionRef : null}
            >
              <Stack direction="row" justifyContent="space-between">
                <Stack flexGrow={1}>
                  {question.questionImageURL && (
                    <>
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            textAlign: "start",
                            fontSize: "20px",
                            paddingBottom: 1,
                            userSelect: "none",
                          }}
                        >
                          {index + 1}. {question.questionImageDesc}
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
                  )}
                  {question.question && (
                    <>
                      <Typography
                        variant="h5"
                        sx={{
                          textAlign: "start",
                          paddingBottom: 1,
                          userSelect: "none",
                        }}
                      >
                        {index + 1}. {question.question}
                      </Typography>
                    </>
                  )}

                  {question.code && (
                    <>
                      <Stack spacing={2}>
                        <Typography
                          variant="h5"
                          component="pre"
                          sx={{ whiteSpace: "pre-wrap", userSelect: "none" }}
                        >
                          {index + 1}. {question.codeDescription}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="pre"
                          sx={{
                            whiteSpace: "pre-wrap",
                            padding: "10px",
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: "5px",
                            userSelect: "none",
                          }}
                        >
                          {question.code}
                        </Typography>
                      </Stack>
                    </>
                  )}
                </Stack>
                <Stack>
                  <IconButton onClick={() => handleDeleteQuestion(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>

              {question.answerType === "Radio" && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <RadioGroup>
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
                  <Divider sx={{ my: 1 }} />
                  <RadioGroup>
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
            </Stack>
          );
        })}
    </>
  );
};

export default ShowQuestions;
