import { createSlice } from "@reduxjs/toolkit";
import { dummyAptitudeData } from "../../data";

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
      return [...state, ...action.payload];
    },
  },
});

export const { addQuestion, addMultipleQuestions } = AptitudeSlice.actions;
export default AptitudeSlice.reducer;
