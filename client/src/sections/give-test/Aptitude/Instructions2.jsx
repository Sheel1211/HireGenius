import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  ListItem,
  List,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PreventKeys from "../Security/PreventKeys";
import { useDispatch } from "react-redux";
import { setSelectedPage } from "../../../store/slices/AptiDashboard";
import moment from "moment";

const Instructions2 = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const handleStartTest = () => {
    dispatch(setSelectedPage("3"));
    localStorage.setItem(`${params.aptitudeId}`, "3");
    // set starting time of aptitude
  };

  return (
    <Container maxWidth="md" sx={{ boxShadow: 2, my: 2 }}>
      <Box marginTop={4} textAlign="start" sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Aptitude Test Instructions - II
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Please read the instructions carefully.
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1">
              <b>1.</b> If you attempt to switch between tabs and exceed the
              allowed attempts, you will be banned from the test.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <b>2.</b> Reloading the page will result in the loss of your data,
              so please avoid doing so.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <b>3.</b> Once you start the test, the timer will begin, and you
              cannot pause the test.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <b>4.</b> Good luck! Begin the test when you are ready.
            </Typography>
          </ListItem>
        </List>

        <Button variant="contained" color="primary" onClick={handleStartTest}>
          Start test
        </Button>
      </Box>
    </Container>
  );
};

export default Instructions2;
