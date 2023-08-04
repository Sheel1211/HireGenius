import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React from "react";
import { Link } from "@mui/material";

const Signin = () => {
  return (
    <>
      <div style={{}}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 8,
              boxShadow: 4,
              background: "white",
              borderRadius: 2,
            }}
          >
            <Avatar
              variant="circular"
              sx={{ m: 1, backgroundColor: "#1665b0" }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: "monospace" }}
            >
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                Login
              </Button>
              <Typography
                color="#1665b5"
                sx={{ textAlign: "center", textDecoration: "underline" }}
              >
                <Link to="/register" variant="body2" sx={{ cursor: "pointer" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Signin;
