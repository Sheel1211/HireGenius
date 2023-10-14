import { Box, Card, Grid, TextareaAutosize, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import AddQuestion from "./AddQuestion";
import ShowQuestion from "./showQuestion";

const CompilerForm = () => {
  return (
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
                <ShowQuestion />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
  );
};

export default CompilerForm;
