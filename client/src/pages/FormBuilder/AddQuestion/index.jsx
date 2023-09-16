import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, Button, FormControl } from "@mui/material";
import Question from "./Question";
import Answer from "./Answer";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../../store/slices/AptitudeSlice";
import validateSingleQuestion from "./validateSingleQuestion";
import { clearQuestion } from "../../../store/slices/SingleQuestion";
import axios from "axios";

const index = () => {
  // It will show the popup when you reload the page
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = "";
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const dispatch = useDispatch();
  const singleQuestion = useSelector((state) => state.SingleQuestion);
  const [isQuestionAdded, setIsQuestionAdded] = useState(false);
  const handleSubmit = () => {
    if (validateSingleQuestion(singleQuestion)) {
      dispatch(addQuestion(singleQuestion));
      dispatch(clearQuestion());
      setIsQuestionAdded(true);
    }
  };
  const questions = useSelector((state) => state.Aptitude);

  const handleGenerateLink = () => {
    console.log(questions);
    const data = {
      aptitudeId: "7093f4c2-97a6-401c-b225-aaa39447ec64",
      questions,
    };
    axios
      .patch("http://localhost:4000/api/saveQuestions", data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <Typography sx={{ textAlign: "center" }} variant="h5" component="div">
          Enter the question
        </Typography>
        <Divider sx={{ marginTop: 2 }} />
      </Box>
      <FormControl fullWidth sx={{ padding: 4 }}>
        <Question />
        <Answer isQuestionAdded={isQuestionAdded} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Button
            fullWidth
            type="submit"
            sx={{ marginTop: 2 }}
            size="medium"
            variant="contained"
            onClick={handleSubmit}
          >
            Add Question
          </Button>
          <Button
            fullWidth
            type="submit"
            sx={{ marginTop: 2 }}
            size="medium"
            variant="contained"
            onClick={handleGenerateLink}
          >
            Generate Link
          </Button>
        </Box>
      </FormControl>
    </>
  );
};

export default index;
