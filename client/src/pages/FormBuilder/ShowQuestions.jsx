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
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ShowQuestions = () => {
  const questions = useSelector((state) => state.Aptitude);
  const lastQuestionRef = useRef(null);

  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questions]);

  return (
    <>
      {questions &&
        questions.map((question, index) => {
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

                <IconButton>
                  <MoreVertIcon />
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
                            value={option.optionURL ? "" : option.option}
                            control={<Radio size="small" />}
                            label={option.optionURL ? "" : option.option}
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
                            value={option.optionURL ? "" : option.option}
                            control={<Checkbox size="small" />}
                            label={option.optionURL ? "" : option.option}
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
