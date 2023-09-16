import { createSlice } from "@reduxjs/toolkit";
import { dummyAptitudeData } from "../../data";

const initialState = dummyAptitudeData;

export const AptitudeSlice = createSlice({
  name: "Aptitude",
  initialState,
  reducers: {
    addQuestion(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addQuestion } = AptitudeSlice.actions;
export default AptitudeSlice.reducer;
