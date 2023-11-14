import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  RadioGroup,
  TextField,
  Checkbox,
} from "@mui/material";
import {
  setOptions,
  setAnswers,
} from "../../../../store/slices/SingleQuestion";
import { useDispatch, useSelector } from "react-redux";

const TextOption = ({ optionNumber }) => {
  const [singleTextOption, setSingleTextOption] = useState("");
  const SingleQuestion = useSelector((state) => state.SingleQuestion);
  const dispatch = useDispatch();

  const handleOptions = (value, optionNumber) => {
    dispatch(setOptions({ value, optionNumber }));
  };

  const handleAnswers = (optionNumber, e) => {
    dispatch(setAnswers({ SingleQuestion, optionNumber, e }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        label="Additional Text"
        value={singleTextOption}
        onChange={(e) => {
          setSingleTextOption(e.target.value);
          handleOptions(e.target.value, optionNumber);
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 2,
        }}
      >
        <RadioGroup row>
          <FormControlLabel
            value="Correct"
            control={<Checkbox size="small" color="success" />}
            label="Correct"
            onClick={(e) => handleAnswers(optionNumber, e)}
          />
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default TextOption;
