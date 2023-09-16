import { configureStore } from "@reduxjs/toolkit";
import { AptitudeSlice } from "./slices/AptitudeSlice";
import { SingleQuestionSlice } from "./slices/SingleQuestion";
import { AptiDashboardSlice } from "./slices/AptiDashboard";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    Aptitude: AptitudeSlice.reducer,
    SingleQuestion: SingleQuestionSlice.reducer,
    AptiDashboard: AptiDashboardSlice.reducer,
  },
});
