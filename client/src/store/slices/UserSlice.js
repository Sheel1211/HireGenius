import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    UserLogin(state, action) {
      return { ...state, User: action.payload };
    },
    getUserDetails(state, action) {
      return { ...state, User: action.payload };
    },
    logoutUser(state, action) {
      Cookies.remove("token", { path: "/", domain: "127.0.0.1" });
      return { ...state, User: action.payload };
    },
  },
});

export const { UserLogin, getUserDetails, logoutUser } = UserSlice.actions;
export default UserSlice.reducer;
