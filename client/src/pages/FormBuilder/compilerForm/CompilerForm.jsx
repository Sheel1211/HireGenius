import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const CompilerForm = () => {
  const [questions, setQuestions] = useState([{ question: '', testcases: [''] }]);
  const [duration, setDuration] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', testcases: [''] }]);
  };

  const handleCandidateChange = (event) => {
    setSelectedCandidates(event.target.value);
  };

  const handleSubmit = () => {
    // Submit the form data to your backend or perform any desired actions
  };

  return (
    <form>
      

      {questions.map((question, index) => (
        <div key={index}>
          <TextField
            label={`Question ${index + 1}`}
            value={question.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            fullWidth
          />
        </div>
      ))}
      <Button variant="outlined" onClick={addQuestion}>
        Add Question
      </Button>

      <TextField
        label="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        fullWidth
      />

      <Select
        label="Select Candidates"
        value={selectedCandidates}
        onChange={handleCandidateChange}
        multiple
        fullWidth
      >
        {/* Replace the following with actual candidate data from your API */}
        <MenuItem value={1}>Candidate 1</MenuItem>
        <MenuItem value={2}>Candidate 2</MenuItem>
        <MenuItem value={3}>Candidate 3</MenuItem>
      </Select>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default CompilerForm;