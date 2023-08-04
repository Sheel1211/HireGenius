import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ShowQuestions = () => {
  // const [isNewTabOpened, setIsNewTabOpened] = useState(false);
  const questions = useSelector((state) => state.Aptitude);

  const lastQuestionRef = useRef(null);

  // Scroll to the last question when new questions are added
  // useEffect(() => {
  //   if (lastQuestionRef.current) {
  //     lastQuestionRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [questions]);

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "hidden") {
  //       setIsNewTabOpened(true);
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  return (
    <>
      {/* <Dialog
        open={isNewTabOpened}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="warning" sx={{ fontSize: "16px" }}>
          <AlertTitle sx={{ fontSize: "24px" }}>Warning</AlertTitle>
          Do not try to leave the page otherwise you will be remove from the
          test
        </Alert>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={() => setIsNewTabOpened(false)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog> */}

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

                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {question.answerType === "Radio" && (
                <>
                  <Divider />
                  <RadioGroup>
                    {question.options.map((option, index) => {
                      return (
                        <FormControlLabel
                          sx={{ userSelect: "none" }}
                          onCopy={(e) => e.preventDefault()}
                          key={index}
                          value={option}
                          control={<Radio size="small" />}
                          label={option}
                        />
                      );
                    })}
                  </RadioGroup>
                </>
              )}

              {question.answerType === "Checkbox" && (
                <>
                  <Divider />
                  <FormGroup>
                    {question.options.map((option, index) => {
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
