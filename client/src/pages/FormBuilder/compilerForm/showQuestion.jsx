import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCodingQuestion } from "../../../store/slices/CodingSlice";
import {
  Container,
  Typography,
  Button,
  IconButton,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ShowQuestion = () => {
  const questions = useSelector((state) => state.Coding.codingQuestions);
  const dispatch = useDispatch();

  const handleRemoveQuestion = (index) => {
    dispatch(removeCodingQuestion(index));
  };

  return (
    <Container sx={{ backgroundColor: "white" }}>
      <Typography variant="h4" color="primary">Questions</Typography>
      {questions &&
        questions.map((question, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h6" sx={{ color: "#1E88E5" }}>
                Question {index + 1}
              </Typography>
              <IconButton
                color="error"
                aria-label="delete"
                onClick={() => handleRemoveQuestion(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingY: 1,
              }}
            >
              <Typography variant="h6" color="textPrimary">Title</Typography>
              <Typography color="textSecondary">{question.title}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingY: 1,
              }}
            >
              <Typography variant="h6" color="textPrimary">Problem Statement</Typography>
              <Typography color="textSecondary">{question.problemStatement}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingY: 1,
              }}
            >
              <Typography variant="h6" color="textPrimary">Testcases</Typography>
              {question.testcases.map((testcase, tcIndex) => (
                <div key={tcIndex}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography variant="h6" color="textPrimary" sx={{ paddingX: "1vmax" }}>
                      INPUT
                    </Typography>
                    <Typography color="textSecondary">{testcase.input}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography variant="h6" color="textPrimary" sx={{ paddingX: "1vmax" }}>
                      OUTPUT
                    </Typography>
                    <Typography color="textSecondary">{testcase.output}</Typography>
                  </Box>
                </div>
              ))}
            </Box>
            {question.hiddenTestcases.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingY: 1,
                }}
              >
                <Typography variant="h6" color="textPrimary">Hidden Testcases</Typography>
                {question.hiddenTestcases.map((testcase, tcIndex) => (
                  <div key={tcIndex}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography variant="h6" color="textPrimary" sx={{ paddingX: "1vmax" }}>
                        INPUT
                      </Typography>
                      <Typography color="textSecondary">{testcase.input}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography variant="h6" color="textPrimary" sx={{ paddingX: "1vmax" }}>
                        OUTPUT
                      </Typography>
                      <Typography color="textSecondary">{testcase.output}</Typography>
                    </Box>
                  </div>
                ))}
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingY: 1,
              }}
            >
              <Typography variant="h6" color="textPrimary">Difficulty</Typography>
              <Typography variant="h6" color="textSecondary" sx={{ paddingX: "1vmax" }}>
                {question.difficulty === "easy" ? (
                  <Chip label="Easy" color="success" />
                ) : question.difficulty === "medium" ? (
                  <Chip label="Medium" color="warning" />
                ) : (
                  <Chip label="Hard" color="error" />
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingY: 1,
              }}
            >
              <Typography variant="h6" color="textPrimary">Marks</Typography>
              <Typography color="textSecondary">{question.marks}</Typography>
            </Box>
            <Divider />
          </Box>
        ))}
    </Container>
  );
};

export default ShowQuestion;
