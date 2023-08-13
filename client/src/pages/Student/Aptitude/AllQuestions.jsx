import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const AllQuestions = ({ setSelectedQuestionIdx }) => {
  const questions = useSelector((state) => state.Aptitude);

  console.log(questions);
  return (
    <>
      <Box sx={{ padding: 2 }}>
        {questions.map((question, index) => {
          return (
            <Box key={index}>
              <Button
                fullWidth
                variant="text"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  p: 2,
                  color: "black",
                  background: "white",
                  "&:hover": {
                    background: "#2196f3",
                    color: "white",
                  },
                }}
                onClick={() => setSelectedQuestionIdx(index)}
              >
                <Typography variant="subtitle1" textTransform="none">
                  {index + 1}. {question.question || question.questionImageDesc}
                </Typography>
              </Button>
              <Divider />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default AllQuestions;
