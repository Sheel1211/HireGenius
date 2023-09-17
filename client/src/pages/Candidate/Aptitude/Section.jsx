import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedIndex,
  setSelectedSection,
} from "../../../store/slices/AptiDashboard";

const Section = () => {
  const dispatch = useDispatch();
  const AptiDetails = useSelector((state) => state.AptiDashboard);
  const sections = AptiDetails.sections;

  const sectionNames = Object.keys(sections);
  const handleSection = (section) => {
    dispatch(setSelectedSection(section));
    dispatch(setSelectedIndex(0));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          gap: 4,
        }}
      >
        {sectionNames.map((section, index) => {
          return (
            <Button
              fullWidth
              variant="contained"
              key={index}
              onClick={() => handleSection(section)}
            >
              {section}
            </Button>
          );
        })}
      </Box>
    </>
  );
};

export default Section;
