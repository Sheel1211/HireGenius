import { configureStore } from "@reduxjs/toolkit";
import { AptitudeSlice } from "./slices/AptitudeSlice";
import { SingleQuestionSlice } from "./slices/SingleQuestion";
import {UserSlice} from "./slices/UserSlice";
import { AptiDashboardSlice } from "./slices/AptiDashboard";
import {codingRoundSlice} from "./slices/CodingSlice";
import { CodingDashboardSlice } from "./slices/CodingDashboard";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    Aptitude: AptitudeSlice.reducer,
    SingleQuestion: SingleQuestionSlice.reducer,
    User: UserSlice.reducer,
    AptiDashboard: AptiDashboardSlice.reducer,
    Coding:codingRoundSlice.reducer,
    CodingDashboard:CodingDashboardSlice.reducer,
  },
});
