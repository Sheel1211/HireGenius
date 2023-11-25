import { createSlice } from "@reduxjs/toolkit";

export const DialogSlice = createSlice({
  name: "DialogSlice",
  initialState: {
    isActivateLinkDialogOpen: false,
  },
  reducers: {
    setIsActivateLinkDialogOpen(state, action) {
      state.isActivateLinkDialogOpen = action.payload;
    },
  },
});

export const { setIsActivateLinkDialogOpen } = DialogSlice.actions;
export default DialogSlice.re;
