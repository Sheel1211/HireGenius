import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {};

export const ClientSlice = createSlice({
  name: "Client",
  initialState,
  reducers: {
    clientLogin(state, action) {
      return { ...state, client: action.payload };
    },
    getClientDetails(state, action) {
      return { ...state, client: action.payload };
    },
    logoutUser(state, action) {
      Cookies.remove("token", { path: "/", domain: "127.0.0.1" });
      return { ...state, client: action.payload };
    },
  },
});

export const { clientLogin, getClientDetails, logoutUser } = ClientSlice.actions;
export default ClientSlice.reducer;
