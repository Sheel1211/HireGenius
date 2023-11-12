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
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.User);
  console.log("details", userDetails);
  useEffect(() => {
    async function fetchData(token) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4000/api/user/me/" + token,
          config
        );
        const user = response.data.user;
        console.log("user in app.jsx", user);
        dispatch(getUserDetails(user));
      } catch (error) {
        // Handle errors, e.g., unauthorized access
        console.log(error);
      }
    }
    const token = Cookies.get("token");
    if (token) {
      fetchData(token);
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  return <AppView />;
}
