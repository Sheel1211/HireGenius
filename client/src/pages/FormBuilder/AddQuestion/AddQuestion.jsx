import React, { useState } from "react";
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Text from "./Text";

const AddQuestion = () => {
  const [questionCategory, setQuestionCategory] = useState("");

  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 1,
          background: "white",
          padding: 3,
        }}
      >
        <Typography
          sx={{ fontFamily: "serif", textAlign: "center" }}
          variant="h5"
          component="div"
        >
          Enter the question type
        </Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onChange={(e) => setQuestionCategory(e.target.value)}
        >
          <FormControlLabel
            value="Text"
            control={<Radio size="small" />}
            label="Text"
          />
          <FormControlLabel
            value="Image"
            control={<Radio size="small" />}
            label="Image"
          />
        </RadioGroup>
        <Divider sx={{ marginTop: 2 }} />
      </Box>

      {questionCategory === "Text" && (
        <>
          <Text />
        </>
      )}
    </>
  );
};

export default AddQuestion;
