import React from "react";
import { useState } from "react";

import { Box } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { useRouter } from "../../routes/hooks";

import { bgGradient } from "../../theme/css";

import Logo from "../../components/logo";
import Iconify from "../../components/iconify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { UserLogin } from "../../store/slices/UserSlice";
import config from "../../utils/config";

const AdminLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();

    // const data = new FormData(event.currentTarget);
    // const email = data.get("email");
    // const password = data.get("password");

    // const email = formData.get("email");
    // const password = formData.get("password");

    axios
      .post(
        "http://127.0.0.1:4000/api/admin/admin-login",
        { email, password },
        config
      )
      .then((res) => {
        console.log("res : ", res.data);
        dispatch(UserLogin(res.data.user));
        Cookies.set("token", res.data.token, { expires: 7 });
        navigate("/admindashboard");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <MuiLink
          variant="subtitle2"
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          {/* Forgot password? */}
        </MuiLink>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 4 }} textAlign="center">
            Admin Login
          </Typography>

          <form onSubmit={handleClick}>{renderForm}</form>
        </Card>
      </Stack>
    </Box>
  );
};

export default AdminLogin;
