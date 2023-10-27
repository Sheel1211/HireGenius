import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  difficulty: "",
  problemStatement: "",
  testcases: [],
  marks: "",
  
};

export const CodingDashboardSlice = createSlice({
  name: "CodingDashboard",
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      return action.payload;
    },
    clearCurrentQuestion: (state) => {
      return initialQuestion;
    },
    updateCorrectlyAnsweredQuestions: (state, action) => {
      console.log(action);
      if (!Array.isArray(state.correctlyAnsweredQuestions)) {
        state.correctlyAnsweredQuestions = [];
      }
      state.correctlyAnsweredQuestions.push(action.payload);
    },
    updateMarksOfCandidate: (state, action) => {
      if (!state.candidateMarks) {
        state.candidateMarks = 0;
      }
      state.candidateMarks += action.payload;
    },
  },
});

export const {
  setCurrentQuestion,
  clearCurrentQuestion,
  updateCorrectlyAnsweredQuestions,
  updateMarksOfCandidate,
} = CodingDashboardSlice.actions;
export default CodingDashboardSlice.reducer;
