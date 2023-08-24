import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { Avatar, Grid } from "@mui/material";

const Header = () => {
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
                <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                  HI... Username{" "}
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
                  30:00:00
                </Typography>
              </Box>
              <Box>
                <Avatar
                  sx={{
                    bgcolor: "white",
                    color: "#2196f3",
                    fontFamily: "monospace",
                  }}
                  alt="Jay Patel"
                >
                  JP
                </Avatar>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
