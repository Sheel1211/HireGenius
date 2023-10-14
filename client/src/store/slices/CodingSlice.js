import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  codingQuestions: [],
};

export const codingRoundSlice = createSlice({
  name: 'codingRound',
  initialState,
  reducers: {
    addCodingQuestion: (state, action) => {
      state.codingQuestions.push(action.payload);
    },
    removeCodingQuestion: (state, action) => {
      state.codingQuestions = state.codingQuestions.filter(
        (question, index) => index !== action.payload
      );
    },
  },
});

export const { addCodingQuestion, removeCodingQuestion } = codingRoundSlice.actions;
export default codingRoundSlice.reducer;