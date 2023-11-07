import { createSlice } from "@reduxjs/toolkit";
import { dummyAptitudeData } from "../../utils/dummy-aptitude-data";

// const initialState = dummyAptitudeData;
const initialState = [];

export const AptitudeSlice = createSlice({
  name: "Aptitude",
  initialState,
  reducers: {
    addQuestion(state, action) {
      state.push(action.payload);
    },
    addMultipleQuestions(state, action) {
      return [...action.payload];
    },
    deleteQuestion(state, action) {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addQuestion, addMultipleQuestions, deleteQuestion } =
  AptitudeSlice.actions;
export default AptitudeSlice.reducer;
