import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../../store/slices/UserSlice.js";
import { setSelectedPage } from "../../../store/slices/AptiDashboard";
import Cookies from "js-cookie";
import {
  setIsToastOpen,
  setToastDuration,
  setToastMessage,
} from "../../../store/slices/ToastMSGSlice.js";
import CustomeSnackBar from "../../../utils/toast-message.jsx";
import { CircularProgress } from "@mui/material";

const defaultTheme = createTheme();

const CandidateLogin = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Toast = useSelector((state) => state.ToastMSG);
  const handleClose = () => {
    dispatch(setIsToastOpen(false));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/aptitude/check/${params.aptitudeId}`)
      .then((res) => {
        setIsValid(true);
        setIsLoading(false);
      })
      .catch((error) => {
        dispatch(setIsToastOpen(true));
        dispatch(setToastMessage(error.response.data.message));
        dispatch(setToastDuration(3000));
        setIsValid(false);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Logic to check verified candidate
    const urlSearchParams = new URLSearchParams(window.location.search);
    const interviewId = urlSearchParams.get("interviewId");

    axios
      .post("http://127.0.0.1:4000/api/isSubmitted", {
        aptitudeId: params.aptitudeId,
        username,
        password,
      })
      .then((res) => {
        axios
          .post("http://127.0.0.1:4000/api/candidate/login", {
            username,
            password,
            interviewId,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("res.data", res.data);
              Cookies.set("token", res.data.user.authToken, { expires: 7 });
              console.log(res.data.user);
              dispatch(UserLogin(res.data.user));
              alert("Login successfully.");
              dispatch(setIsToastOpen(true));
              dispatch(setToastMessage("Login successfully"));
              dispatch(setToastDuration(3000));

              localStorage.setItem(`${params.aptitudeId}`, "1");
              dispatch(setSelectedPage("1"));
            } else if (res.status === 202) {
              dispatch(setIsToastOpen(true));
              dispatch(
                setToastMessage("You are not allowed to give this test")
              );
              dispatch(setToastDuration(3000));
            } else if (res.status === 204) {
              dispatch(setIsToastOpen(true));
              dispatch(setToastMessage("We can't found you"));
              dispatch(setToastDuration(3000));
            }
          })
          .catch((error) => {
            dispatch(setIsToastOpen(true));
            dispatch(setToastMessage(error.response.data.message));
            dispatch(setToastDuration(3000));
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsToastOpen(true));
        dispatch(setToastMessage(error.response.data.message));
        dispatch(setToastDuration(3000));
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      {isLoading && (
        <>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <CircularProgress size={60} />
          </Container>
        </>
      )}

      {!isLoading && !isValid && (
        <>
          <Container>
            <Box
              sx={{
                py: 12,
                mx: "auto",
                display: "flex",
                minHeight: "100vh",
                textAlign: "center",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3" sx={{ mb: 3 }}>
                Sorry, you can't access the link right now!
              </Typography>

              <Typography sx={{ color: "text.secondary" }} variant="h5">
                You can only access this link after your examinor starts the
                test.
              </Typography>

              <Box
                component="img"
                src="/assets/illustrations/illustration_404.svg"
                sx={{
                  mx: "auto",
                  height: 260,
                  my: { xs: 5, sm: 10 },
                }}
              />
            </Box>
          </Container>
        </>
      )}
      {!isLoading && isValid && (
        <Container component="main" maxWidth="xs">
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
              Enter your usename and password provided in your email
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
      )}
      <CustomeSnackBar
        isOpen={Toast.isToastOpen}
        message={Toast.message}
        handleClose={handleClose}
        duration={Toast.duration}
      />
    </ThemeProvider>
  );
};

export default CandidateLogin;
