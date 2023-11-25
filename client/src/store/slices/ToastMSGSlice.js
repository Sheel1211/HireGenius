import { createSlice } from "@reduxjs/toolkit";

export const ToastMSGSlice = createSlice({
  name: "ToastMSG",
  initialState: {
    isToastOpen: false,
    message: "",
    duration: 0,
  },
  reducers: {
    setToastMessage(state, action) {
      state.message = action.payload;
    },
    setToastDuration(state, action) {
      state.duration = action.payload;
    },
    setIsToastOpen(state, action) {
      state.isToastOpen = action.payload;
    },
  },
});

export const { setToastDuration, setToastMessage, setIsToastOpen } =
  ToastMSGSlice.actions;
export default ToastMSGSlice.reducer;
