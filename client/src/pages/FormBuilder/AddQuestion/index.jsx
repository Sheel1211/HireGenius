import React from "react";
import { Box, Divider, Typography, Button, FormControl } from "@mui/material";
import Question from "./Question";
import Answer from "./Answer";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../../store/slices/AptitudeSlice";

const index = () => {
  const dispatch = useDispatch();
  const singleQuestion = useSelector((state) => state.SingleQuestion);
  const handleSubmit = () => {
    dispatch(addQuestion(singleQuestion));
  };

  console.log(singleQuestion);

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
        <Typography
          sx={{ fontFamily: "serif", textAlign: "center" }}
          variant="h5"
          component="div"
        >
          Enter the question
        </Typography>
        <Divider sx={{ marginTop: 2 }} />
      </Box>
      <FormControl fullWidth sx={{ padding: 4 }}>
        <Question />
        <Answer />
        <Button
          type="submit"
          sx={{ marginTop: 2 }}
          size="medium"
          variant="contained"
          onClick={handleSubmit}
        >
          Add Question
        </Button>
      </FormControl>
    </>
  );
};

export default index;
