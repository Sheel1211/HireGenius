import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          minWidth: "100vw",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        fixed
        disableGutters={true}
      >
        <Box
          sx={{
            width: 800,
            height: 700,
            backgroundColor: "primary",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          border={1} // You can adjust the border width here (e.g., 1px, 2px, etc.)
          borderColor="primary.main" // You can set the border color using the theme palette (primary, secondary, etc.) or any valid CSS color.
          borderRadius={4}
        >
          <Typography variant="h3" sx={{ marginBottom: "1vmax",fontFamily:"Roboto",fontWeight:"600" }}>
            Code Art
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: "0.8vmax",fontFamily:"sans-serif" }}>
            Code. Compile. Debug.
          </Typography>
          <Button
            variant="contained"
            
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
              width:"35%",
              fontFamily:"cursive"
            }}

            onClick={()=>navigate("/compiler/playground")}
          >
            Enter <ArrowRightAltRoundedIcon />
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Home;
