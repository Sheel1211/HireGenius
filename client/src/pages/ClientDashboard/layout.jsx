import React from "react";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import SideBarSection from "./sideBarSection";
import SideBarConfig from "./sideBarConfig";
import Logo from "./Logo";
import { styled, alpha } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const NAV_WIDTH = 280;

const account = {
  displayName: "Jaydon Frankie",
  email: "demo@minimals.cc",
  //   photoURL: "/assets/images/avatars/avatar_default.jpg",
};

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const layout = () => {
  return (
    <StyledRoot>
      <Box>
        <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
          <Logo />
        </Box>

        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none">
            <StyledAccount>
              <Avatar src={account.photoURL} alt="photoURL" />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {account.displayName}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {account.role}
                </Typography>
              </Box>
            </StyledAccount>
          </Link>
        </Box>

        <SideBarSection data={SideBarConfig} />

        {/* <Box sx={{ flexGrow: 1 }} /> */}

        <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
          <Stack
            alignItems="center"
            spacing={3}
            sx={{ pt: 5, borderRadius: 2, position: "relative" }}
          ></Stack>
        </Box>
      </Box>

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
};

export default layout;
