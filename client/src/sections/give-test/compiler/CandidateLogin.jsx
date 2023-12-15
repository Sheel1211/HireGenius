import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../../store/slices/UserSlice.js";
import { setSelectedPage } from "../../../store/slices/AptiDashboard";
import Cookies from "js-cookie";

const defaultTheme = createTheme();
const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};

const CandidateLogin = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/aptitude/check/${params.aptitudeId}`).then((res)=>{
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        error("Something went wrong!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const username= data.get("username");
    const password= data.get("password");
    
    
    // Logic to check verified candidate
    const urlSearchParams = new URLSearchParams(window.location.search);
    const interviewId = urlSearchParams.get("interviewId");

    // console.log("interview id : ",interviewId)
    console.log(username, password,interviewId)
    axios
    .post(
      "http://127.0.0.1:4000/api/candidate/login",
      { username, password,interviewId},
      { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => {
      if (res.status === 200) {
        console.log("res.data", res.data);
        Cookies.set("token", res.data.user.authToken, { expires: 7 });
        console.log(res.data.user)
        dispatch(UserLogin(res.data.user));
        alert("Login successfully.")

      } else if (res.status === 202) {
        alert("You are not candidate");
      } else if (res.status === 204) alert("No candidate for given data");
    })

    .catch((err) => {
      console.log(err)
      alert("Something went wrong!");
    });
   
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 2,
            p: 4,
          }}
        >
          <Typography
            component="p"
            variant="body1"
            sx={{ my: 2, color: "#1565c0" }}
          >
            Enter your username and password provided in your email
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CandidateLogin;