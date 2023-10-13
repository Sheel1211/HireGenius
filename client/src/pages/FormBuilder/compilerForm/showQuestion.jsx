import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCodingQuestion } from '../../../store/slices/CodingSlice';
import {
  Container,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowQuestion = () => {
  const questions = useSelector((state) => state.Coding.codingQuestions);
  const dispatch = useDispatch();

  const handleRemoveQuestion = (index) => {
    dispatch(removeCodingQuestion(index));
  };

  return (
    <Container>
      <Typography variant="h4">Saved Questions</Typography>
      {questions &&
        questions.map((question, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Question {index + 1}</Typography>
            <Typography>Problem Statement: {question.problemStatement}</Typography>
            <Typography>Testcases - INPUT: {question.testcases.input}</Typography>
            <Typography>Testcases - OUTPUT: {question.testcases.output}</Typography>
            <Typography>Difficulty: {question.difficulty}</Typography>
            <Typography>Duration: {question.duration}</Typography>
            <IconButton
              color="error"
              aria-label="delete"
              onClick={() => handleRemoveQuestion(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
    </Container>
  );
};

export default ShowQuestion;
