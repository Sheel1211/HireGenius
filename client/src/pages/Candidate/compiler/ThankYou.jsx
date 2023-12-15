import { Box, Card, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};

const ThankYou = () => {
  useEffect(() => {
    const user = localStorage.getItem("User");
    const marks = localStorage.getItem("totalMarks");
    const codingId = localStorage.getItem("codingId")
    console.log(marks)
    
    if (user && marks) {
      const postData = {
        user: user,
        marks: marks,
        codingId:codingId,
      };

      
      axios.post("http://localhost:4000/api/coding/post/marks", postData,config)
        .then((response) => {
          
          console.log("POST request successful", response.data);
        })
        .catch((error) => {
          
          console.error("Error making POST request", error);
        });
    }


    localStorage.clear();
  }, []);

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          boxShadow: 2,
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mt: 10,
        }}
      >
        <Box>
          <Typography variant="h5">
            Thank you for attempting the test.
          </Typography>
          <Typography variant="body1">You may close the window now.</Typography>
        </Box>
      </Container>
    </>
  );
};

export default ThankYou;
