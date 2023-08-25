import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ShowQuestion = ({ selectedQuestionIdx }) => {
  const questions = useSelector((state) => state.Aptitude);

  const handleFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
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
              <Divider />
              <RadioGroup>
                {questions[selectedQuestionIdx].options.map((option, index) => {
                  // console.log(option)
                  return (
                    <FormControlLabel
                      sx={{ userSelect: "none" }}
                      onCopy={(e) => e.preventDefault()}
                      key={index}
                      value={option}
                      control={<Radio size="small" />}
                      label={option.option}
                    />
                  );
                })}
              </RadioGroup>
            </>
          )}

          {questions[selectedQuestionIdx].answerType === "Checkbox" && (
            <>
              <Divider />
              <FormGroup>
                {questions[selectedQuestionIdx].options.map((option, index) => {
                  return (
                    <FormControlLabel
                      sx={{ userSelect: "none" }}
                      key={index}
                      value={option}
                      control={<Checkbox size="small" />}
                      label={option}
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
      </Box>
      <Button onClick={handleFullScreen}>Full Screen</Button>
    </>
  );
};

export default ShowQuestion;
