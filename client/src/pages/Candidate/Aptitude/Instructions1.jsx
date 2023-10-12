import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPage } from "../../../store/slices/AptiDashboard";

const Instructions1 = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const handleNext = () => {
    localStorage.setItem(`${params.aptitudeId}`, "2");
    dispatch(setSelectedPage("2"));
  };
  const user = useSelector((state) => state.User);
  const navigate = useNavigate();

  console.log("user",user.User)
  
  return (
    <Container maxWidth="md" sx={{ boxShadow: 2, my: 2 }}>
      <Box marginTop={4} textAlign="start" sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Aptitude Test Instructions - I
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Welcome to the Aptitude Test. Please read the instructions carefully
          before starting the test.
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1">
              <b>1.</b> This test consists of multiple sections.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <b>2.</b> In the left side you can see number of questions and
              other details
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <b>3.</b> In the right side you can see one header which contains
              all the sections and below that you can see questions
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <b>4.</b> In the right side you can see one header which contains
              all the sections and below that you can see questions
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <b>5.</b> You can proceed to the next question by clicking the
              'Next' button below. Similarly, you can go back to the previous
              question using the 'Previous' button.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <b>6.</b> You can clear the response of the questions by clicking
              the 'Clear' button
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <b>7.</b> You have to submit test by clicking on 'Submit Test'
              button from the top right corner before time.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              <b>8.</b> Ensure you submit the test within the specified time
              duration, as scores will not be considered after this period.
              Please note that there is no auto-submit feature.
            </Typography>
          </ListItem>
        </List>

        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Instructions1;
