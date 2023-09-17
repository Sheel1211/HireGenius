import { configureStore } from "@reduxjs/toolkit";
import { AptitudeSlice } from "./slices/AptitudeSlice";
import { SingleQuestionSlice } from "./slices/SingleQuestion";
import {UserSlice} from "./slices/UserSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    Aptitude: AptitudeSlice.reducer,
    SingleQuestion: SingleQuestionSlice.reducer,
    User: UserSlice.reducer,
  },
});
