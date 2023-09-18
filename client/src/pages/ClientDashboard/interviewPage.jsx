import { Box } from "@mui/material";
import { Link } from "react-router-dom";
// import Grid from "@mui/system/Unstable_Grid";
import { Grid, Container, Typography } from "@mui/material";

export default function interviewPage() {
  return (
    <Box sx={{ width: "100%", paddingLeft: "50px" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={4} item>
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
              alt="Aptitude round"
              src="/src/assets/images/Quantitative-Aptitude logo.jpg"
            />
          </Link>
          <Typography variant="h5" sx={{ mb: 5 }}>
            Aptitude Round
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
