import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { spaceBetween } from "./styles";
import {
  addSelectedOptions,
  setSelectedIndex,
  setSelectedSection,
} from "../../../store/slices/AptiDashboard";

const ShowQuestion = () => {
  const dispatch = useDispatch();
  const AptiDetails = useSelector((state) => state.AptiDashboard);
  const questions = AptiDetails.sections[AptiDetails.selectedSection];
  let selectedQuestionIdx = AptiDetails.selectedIndex;

  const handlePrevClick = (currentIndex) => {
    if (currentIndex === 0) {
      const currentSection = AptiDetails.selectedSection;
      const sectionKeys = Object.keys(AptiDetails.sections);
      const currentSectionIndex = sectionKeys.indexOf(currentSection);
      if (currentSectionIndex !== 0) {
        dispatch(setSelectedSection(sectionKeys[currentSectionIndex - 1]));
        const len =
          AptiDetails.sections[sectionKeys[currentSectionIndex - 1]].length;
        dispatch(setSelectedIndex(len - 1));
      }
    } else {
      dispatch(setSelectedIndex(currentIndex - 1));
    }
  };

  const handleSaveAndNextClick = (currentIndex) => {
    const len = AptiDetails.sections[AptiDetails.selectedSection].length;
    if (currentIndex === len - 1) {
      const currentSection = AptiDetails.selectedSection;
      const sectionKeys = Object.keys(AptiDetails.sections);
      const currentSectionIndex = sectionKeys.indexOf(currentSection);
      if (currentSectionIndex !== sectionKeys.length - 1) {
        dispatch(setSelectedSection(sectionKeys[currentSectionIndex + 1]));
        dispatch(setSelectedIndex(0));
      }
    } else {
      dispatch(setSelectedIndex(currentIndex + 1));
    }
  };

  const handleOptionSelect = (e, section, questionIndex, optionIndex) => {
    dispatch(addSelectedOptions({ e, section, questionIndex, optionIndex }));
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            background: "white",
            margin: 4,
            padding: 4,
            boxShadow: 2,
            maxHeight: "550px",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {questions[selectedQuestionIdx].questionImageURL ? (
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
                  {selectedQuestionIdx + 1}.{" "}
                  <img
                    src={questions[selectedQuestionIdx].questionImageURL}
                    alt="Big Image"
                    style={{
                      width: "100%",
                      objectFit: "contain",
                    }}
                    draggable={false}
                  />
                </Typography>
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
                  {selectedQuestionIdx + 1}.{" "}
                  {questions[selectedQuestionIdx].question}
                </Typography>
              </>
            )}
          </Box>

          {questions[selectedQuestionIdx].answerType === "Radio" && (
            <>
              <Divider sx={{ my: 2 }} />
              <FormControl>
                <RadioGroup>
                  {questions[selectedQuestionIdx].options.map(
                    (option, index) => {
                      return (
                        <FormControlLabel
                          sx={{ userSelect: "none" }}
                          onCopy={(e) => e.preventDefault()}
                          key={index}
                          value={option.option}
                          control={
                            <Radio
                              size="small"
                              checked={AptiDetails.sections[
                                AptiDetails.selectedSection
                              ][selectedQuestionIdx].selectedOptions.includes(
                                index
                              )}
                              onChange={(e) =>
                                handleOptionSelect(
                                  e,
                                  AptiDetails.selectedSection,
                                  selectedQuestionIdx,
                                  index
                                )
                              }
                            />
                          }
                          label={
                            <Typography sx={{ fontSize: "1.2rem" }}>
                              {option.option}
                            </Typography>
                          }
                        />
                      );
                    }
                  )}
                </RadioGroup>
              </FormControl>
            </>
          )}

          {questions[selectedQuestionIdx].answerType === "Checkbox" && (
            <>
              <Divider sx={{ my: 2 }} />
              <FormGroup>
                {questions[selectedQuestionIdx].options.map((option, index) => {
                  return (
                    <FormControlLabel
                      sx={{ userSelect: "none" }}
                      key={index}
                      value={option.option}
                      control={
                        <Checkbox
                          size="small"
                          checked={AptiDetails.sections[
                            AptiDetails.selectedSection
                          ][selectedQuestionIdx].selectedOptions.includes(
                            index
                          )}
                          onChange={(e) =>
                            handleOptionSelect(
                              e,
                              AptiDetails.selectedSection,
                              selectedQuestionIdx,
                              index
                            )
                          }
                        />
                      }
                      label={option.option}
                    />
                  );
                })}
              </FormGroup>
            </>
          )}
          {questions[selectedQuestionIdx].answerType === "Text" && (
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
        <Container
          maxWidth="md"
          sx={{ position: "absolute", bottom: 50, ml: 2 }}
        >
          <Box
            sx={{
              ...spaceBetween,
            }}
          >
            <Button
              variant="contained"
              onClick={() => handlePrevClick(selectedQuestionIdx)}
            >
              Previous
            </Button>
            <Button variant="contained"> Clear </Button>
            <Button
              variant="contained"
              onClick={() => handleSaveAndNextClick(selectedQuestionIdx)}
            >
              Next
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ShowQuestion;
