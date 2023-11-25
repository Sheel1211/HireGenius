import React, { useEffect, useState } from "react";
import ShowQuestion from "./ShowQuestion";
import AllQuestions from "./AllQuestions";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import Header from "./Header";
import NewTab from "../Security/NewTab";
import Section from "./Section";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import SquareIcon from "@mui/icons-material/Square";
import { center } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestions,
  setIsLoading,
  setSelectedIndex,
  setSelectedSection,
  setSections,
  setDuration,
  setNegativeMarking,
  setColor,
} from "../../../store/slices/AptiDashboard";
import { QUANTITATIVE } from "../../../utils/helper";
import PreventKeys from "../Security/PreventKeys";

const Test = () => {
  const dispatch = useDispatch();
  const AptiDetails = useSelector((state) => state.AptiDashboard);
  const questions = AptiDetails.sections[AptiDetails.selectedSection];
  const params = useParams();
  const { aptitudeId } = params;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/aptitude/questions/${aptitudeId}`)
      .then((res) => {
        const coloredquestions = res.data.questions.map((question, index) => {
          if (index === 0) {
            return { ...question, color: "secondary" };
          } else {
            return { ...question, color: "primary" };
          }
        });

        console.log(res);
        dispatch(setQuestions(coloredquestions));
        dispatch(setSections(coloredquestions));
        dispatch(setSelectedSection(QUANTITATIVE));
        dispatch(setSelectedIndex(0));
        dispatch(setIsLoading(false));
        dispatch(setDuration(res.data.testDuration));
        dispatch(setNegativeMarking(res.data.negativeMarking));
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
      });
  }, [aptitudeId]);

  if (AptiDetails.isLoading) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            border: "1px solid black",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  // Logic to show the number of questions for selected section
  // console.log(AptiDetails.sections);

  const len = AptiDetails.sections[AptiDetails.selectedSection].length;
  const numbers = Array.from({ length: len }, (_, index) => index + 1);

  const handleSelectedQuestion = (number) => {
    dispatch(setSelectedIndex(number - 1));
    const currentSection = AptiDetails.selectedSection;
    dispatch(setColor({ selectedQuestionIdx: number - 1, currentSection }));
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#eeeeee" }}>
      <Header />
      <Box sx={{ mt: 2 }}>
        {/* <NewTab /> */}
        {/* <PreventKeys /> */}

        <Grid container spacing={2} columns={20}>
          <Grid item xs={7}>
            <Card
              sx={{
                height: "85vh",
                overflowY: "auto",
                boxShadow: 2,
                ml: 4,
                mb: 4,
                p: 4,
              }}
            >
              {/* Shows Questions  */}
              <Box>
                <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                  {AptiDetails.selectedSection}
                </Typography>
                <Grid container gap={2}>
                  {numbers.map((number, index) => (
                    <Grid item xs={2} key={index}>
                      <Button
                        variant="contained"
                        align="center"
                        color={questions[number - 1].color}
                        sx={{ p: 1 }}
                        onClick={() => {
                          handleSelectedQuestion(number);
                        }}
                      >
                        {number}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  width: "100%",
                  my: 4,
                }}
              />
              {/* Shows Instruction */}
              <Box>
                <Box sx={center}>
                  <SquareIcon
                    sx={{
                      color: "#1976d2",
                      borderRadius: 10,
                      width: "30px",
                      height: "30px",
                      mr: 1,
                    }}
                  />
                  <Typography variant="subtitle1"> Not visited </Typography>
                </Box>
                <Box sx={center}>
                  <SquareIcon
                    sx={{
                      color: "#2e7d32",
                      borderRadius: 10,
                      width: "30px",
                      height: "30px",
                      mr: 1,
                    }}
                  />
                  <Typography variant="subtitle1"> Answered </Typography>
                </Box>
                <Box sx={center}>
                  <SquareIcon
                    sx={{
                      color: "#9c27b0",
                      borderRadius: 10,
                      width: "30px",
                      height: "30px",
                      mr: 1,
                    }}
                  />
                  <Typography variant="subtitle1"> Not Answered </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={13}>
            <Section />
            <ShowQuestion />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Test;
