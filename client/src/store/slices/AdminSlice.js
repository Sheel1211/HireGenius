import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {};

export const AdminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    adminLogin(state, action) {
      return { ...state, admin: action.payload };
    },
    getAdminDetails(state, action) {
      return { ...state, admin: action.payload };
    },
    logoutUser(state, action) {
      Cookies.remove("token", { path: "/", domain: "127.0.0.1" });
      return { ...state, admin: action.payload };
    },
  },
});

export const { adminLogin, getAdminDetails, logoutUser } = AdminSlice.actions;
export default AdminSlice.reducer;
