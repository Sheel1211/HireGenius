import { configureStore } from "@reduxjs/toolkit";
import { AdminSlice } from "./slices/AdminSlice";
import { AptitudeSlice } from "./slices/AptitudeSlice";
import { SingleQuestionSlice } from "./slices/SingleQuestion";
import {ClientSlice } from "./slices/ClientSlice";
import {UserSlice} from "./slices/UserSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    Aptitude: AptitudeSlice.reducer,
    SingleQuestion: SingleQuestionSlice.reducer,
    Admin: AdminSlice.reducer,
    Client: ClientSlice.reducer,
    User: UserSlice.reducer,
  },
});
