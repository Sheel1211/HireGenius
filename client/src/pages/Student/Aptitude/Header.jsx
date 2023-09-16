import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar, Button, Grid } from "@mui/material";
import { center } from "./styles";

const Header = () => {
  const handleFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  };

  return (
    <AppBar position="sticky" sx={{ boxShadow: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container spacing={1} columns={20}>
            <Grid item xs={8}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Avatar
                  sx={{ bgcolor: "white", color: "#2196f3", mr: 2 }}
                  alt="Jay Patel"
                >
                  <Typography
                    variant="body"
                    sx={{
                      cursor: "pointer",
                      fontFamily: "cursive",
                    }}
                  >
                    HG
                  </Typography>
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "monospace", mr: 2 }}
                >
                  HI... Username
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              xs={12}
            >
              <Box>
                <Typography
                  textAlign="center"
                  variant="h6"
                  sx={{ fontFamily: "monospace" }}
                >
                  30:00 (MM:SS)
                </Typography>
              </Box>
              <Box sx={center}>
                {/* <Button
                  variant="contained"
                  sx={{
                    color: "black",
                    background: "white",
                    ":hover": { background: "lightgray", color: "black" },
                  }}
                  onClick={handleFullScreen}
                >
                  Full Screen
                </Button> */}
                <Button
                  variant="contained"
                  sx={{
                    color: "black",
                    background: "white",
                    ":hover": { background: "lightgray", color: "black" },
                  }}
                >
                  Submit Test
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
