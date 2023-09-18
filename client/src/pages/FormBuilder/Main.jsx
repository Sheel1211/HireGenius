import React from "react";
import { Box, Card, Grid } from "@mui/material";
import { Item, PlusIcon } from "./Style";
import AddQuestion from "./AddQuestion";
import ShowQuestions from "./ShowQuestions";
import { useLocation } from "react-router-dom";

const Main = () => {
  //   const [isPartitionOpen, setIsPartitionOpen] = useState(false);
      const location  = useLocation();
      const {dat} = location.state;

      localStorage.setItem("aptitudeid",dat.aptitudeId);
      
  return (
    <>
      {/* {!isPartitionOpen && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontFamily: "serif" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Do you want to add question ?
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => setIsPartitionOpen(true)}
                  fullWidth
                  variant="contained"
                  color="success"
                >
                  Yes
                </Button>
                <Button fullWidth variant="contained" color="error">
                  No
                </Button>
              </CardActions>
            </Card>
          </div>
        </>
      )} */}

      <>
        <Box
          sx={{
            flexGrow: 1,
            height: "100vh",
            background: "#eeeeee",
          }}
        >
          <Grid container spacing={2} columns={16} sx={{}}>
            <Grid item xs={8}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    margin: 2,
                    background: "#ffffff",
                    boxShadow: 2,
                    maxHeight: "85vh",
                    overflowY: "auto",
                  }}
                >
                  <AddQuestion />
                </Card>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box
                sx={{
                  maxHeight: "100vh",
                  overflowY: "auto",
                  background: "#eeeeee",
                }}
              >
                <ShowQuestions />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    </>
  );
};

export default Main;
