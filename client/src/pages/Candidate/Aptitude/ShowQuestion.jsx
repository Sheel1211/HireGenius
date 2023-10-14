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
  clearQuestion,
  setColor,
  setSelectedIndex,
  setSelectedSection,
} from "../../../store/slices/AptiDashboard";

const ShowQuestion = () => {
  const dispatch = useDispatch();
  const AptiDetails = useSelector((state) => state.AptiDashboard);
  const questions = AptiDetails.sections[AptiDetails.selectedSection];
  let selectedQuestionIdx = AptiDetails.selectedIndex;

  const handlePrevClick = (currentIndex) => {
    const currentSection = AptiDetails.selectedSection;
    if (currentIndex === 0) {
      const sectionKeys = Object.keys(AptiDetails.sections);
      const currentSectionIndex = sectionKeys.indexOf(currentSection);
      if (currentSectionIndex !== 0) {
        dispatch(setSelectedSection(sectionKeys[currentSectionIndex - 1]));
        const len =
          AptiDetails.sections[sectionKeys[currentSectionIndex - 1]].length;
        dispatch(setSelectedIndex(len - 1));
        dispatch(
          setColor({
            selectedQuestionIdx: len - 1,
            currentSection: sectionKeys[currentSectionIndex - 1],
          })
        );
      }
    } else {
      dispatch(setSelectedIndex(currentIndex - 1));
      dispatch(
        setColor({
          selectedQuestionIdx: currentIndex - 1,
          currentSection: AptiDetails.selectedSection,
        })
      );
    }
  };

  const handleSaveAndNextClick = (currentIndex) => {
    const len = AptiDetails.sections[AptiDetails.selectedSection].length;
    const currentSection = AptiDetails.selectedSection;
    const sectionKeys = Object.keys(AptiDetails.sections);
    const currentSectionIndex = sectionKeys.indexOf(currentSection);
    if (currentIndex === len - 1) {
      if (currentSectionIndex !== sectionKeys.length - 1) {
        dispatch(setSelectedSection(sectionKeys[currentSectionIndex + 1]));
        dispatch(setSelectedIndex(0));
        dispatch(
          setColor({
            selectedQuestionIdx: 0,
            currentSection: sectionKeys[currentSectionIndex + 1],
          })
        );
      }
    } else {
      dispatch(setSelectedIndex(currentIndex + 1));
      dispatch(
        setColor({
          selectedQuestionIdx: currentIndex + 1,
          currentSection: AptiDetails.selectedSection,
        })
      );
    }
  };

  const handleClear = (selectedQuestionIdx) => {
    const currentSection = AptiDetails.selectedSection;
    dispatch(
      clearQuestion({
        selectedQuestionIdx,
        currentSection,
      })
    );
    dispatch(setColor({ selectedQuestionIdx, currentSection }));
  };

  const handleOptionSelect = (e, section, questionIndex, optionIndex) => {
    dispatch(
      setColor({
        selectedQuestionIdx: questionIndex,
        currentSection: section,
        color: "success",
      })
    );
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
                        <Box key={index}>
                          <FormControlLabel
                            sx={{ userSelect: "none" }}
                            onCopy={(e) => e.preventDefault()}
                            value={
                              option?.optionURL
                                ? option.optionURL
                                : option.option
                            }
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
            <Button
              variant="contained"
              onClick={() => handleClear(selectedQuestionIdx)}
            >
              Clear
            </Button>
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
