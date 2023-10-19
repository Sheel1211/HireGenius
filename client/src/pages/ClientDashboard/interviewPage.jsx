import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
// import Grid from "@mui/system/Unstable_Grid";
import { Grid, Container, Typography } from "@mui/material";
import { useState } from "react";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};

export default function interviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const [aptitudeTitle, setAptitudeTitle] = useState("");
  const [isCreateAptiOpen, setIsCreateAptiOpen] = useState(false);

  const handleCreateAptitude = () => {
    setIsCreateAptiOpen(true);
  };

  const handleCloseAptitude = () => {
    setIsCreateAptiOpen(false);
  };

  const createAptitude = async () => {
    const interviewId = location.state;
    axios
      .post("http://127.0.0.1:4000/api/createAptitude", {
        ...config,
        title: aptitudeTitle,
        interviewId,
      })
      .then((res) => {
        const dat = res.data.aptitude;

        navigate("/create/aptitude", {
          state: { dat },
        });
      })
      .catch((e) => {
        console.log(e);
      });
    setIsCreateAptiOpen(false);
  };

  const createCompiler = async () => {
    console.log(location.state, "545454");
    const interviewId = location.state;
    navigate("/create/compiler", { state: interviewId });

    // navigate("/create/compiler");
  };

  return (
    <Box sx={{ width: "100%", paddingLeft: "50px" }}>
      <Dialog
        open={isCreateAptiOpen}
        onClose={handleCloseAptitude}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          Enter the title of the Aptitude Round
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="apti-title"
            type="text"
            fullWidth
            variant="standard"
            value={aptitudeTitle}
            onChange={(e) => setAptitudeTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAptitude}>DisAgree</Button>
          <Button onClick={createAptitude}>Agree</Button>
        </DialogActions>
      </Dialog>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={4} onClick={handleCreateAptitude}>
          <Link to="#">
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                cursor: "pointer", // Change cursor on hover
                transition: "transform 0.2s", // Add transition for a smoother effect
                "&:hover": {
                  transform: "scale(1.05)", // Scale the image on hover
                },
              }}
              alt="Aptitude round"
              src="/src/assets/images/Quantitative-Aptitude logo.jpg"
            />
          </Link>
          <Typography variant="h5" sx={{ mb: 5 }}>
            Aptitude Round
          </Typography>
        </Grid>
        <Grid xs={4} onClick={createCompiler}>
          <Link to="#">
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                cursor: "pointer", // Change cursor on hover
                transition: "transform 0.2s", // Add transition for a smoother effect
                "&:hover": {
                  transform: "scale(1.05)", // Scale the image on hover
                },
              }}
              alt="Coding round"
              src="/src/assets/images/coding logo.png"
            />
          </Link>
          <Typography variant="h5" sx={{ mb: 5 }}>
            Coding Round
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Link to="#">
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                cursor: "pointer", // Change cursor on hover
                transition: "transform 0.2s", // Add transition for a smoother effect
                "&:hover": {
                  transform: "scale(1.05)", // Scale the image on hover
                },
              }}
              alt="Group Discussion"
              src="/src/assets/images/group duscussion.avif"
            />
          </Link>
          <Typography variant="h5" sx={{ mb: 5 }}>
            Group Discussion Round
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
