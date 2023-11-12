import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Interviews from "../../interviews/interview-view";

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Grid xs={12} md={6} lg={8}>
        <Interviews />
      </Grid>
    </Container>
  );
}
