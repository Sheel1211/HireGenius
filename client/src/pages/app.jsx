// import { AppView } from "../sections/overview/view";
import AppView from "../sections/interviews/view";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { getUserDetails } from "../store/slices/UserSlice";
import { CircularProgress, Container } from "@mui/material";
import Loader from "../utils/loader";

// ----------------------------------------------------------------------

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};

export default function AppPage() {
  return <AppView />;
}
