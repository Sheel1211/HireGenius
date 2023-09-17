import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const AdminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    adminLogin(state, action) {
      return {...state,admin:action.payload}
    },
  },
});

export const { adminLogin } = AdminSlice.actions;
export default AdminSlice.reducer;
