import React, { useState } from "react";
import TextOption from "./TextOption";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { PlusIcon } from "../Style";
import { useDispatch, useSelector } from "react-redux";
import { setAnswerType } from "../../../store/slices/SingleQuestion";
import ImageOption from "./ImageOption";

const Answer = () => {
  const [showOption, setShowOption] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [optionTypeDialog, setOptionTypeDialog] = useState(false);
  const [optionType, setOptionType] = useState("Text");

  const dispatch = useDispatch();
  const singleQuestion = useSelector((state) => state.SingleQuestion);
  const { answerType } = singleQuestion;

  const handleAddOption = () => {
    if (showOption.length + 1 > 4) {
      setShowAlert(true);
      return;
    }

    if (optionType === "Text") {
      const newOption = (
        <TextOption
          key={showOption.length + 1}
          optionNumber={showOption.length + 1}
        />
      );
      setShowOption([...showOption, newOption]);
    } else {
      const newOption = (
        <ImageOption
          key={showOption.length + 1}
          optionNumber={showOption.length + 1}
        />
      );
      setShowOption([...showOption, newOption]);
    }
  };

  const handleOpenOptionDialog = () => {
    setOptionTypeDialog(true);
  };

  const handleCloseOptionDialog = (agree) => {
    setOptionTypeDialog(false);
    if (agree) handleAddOption();
  };

  return (
    <>
      <FormControl fullWidth>
        <FormLabel focused={false} sx={{ marginTop: 2 }}>
          Enter the answer type
        </FormLabel>
        <FormControl>
          <Select
            size="small"
            value={answerType}
            onChange={(e) => dispatch(setAnswerType(e.target.value))}
          >
            <MenuItem value="None"> None </MenuItem>
            <MenuItem value="Radio">Radio</MenuItem>
            <MenuItem value="Checkbox">Checkbox</MenuItem>
            <MenuItem value="Text">Text</MenuItem>
          </Select>
        </FormControl>
      </FormControl>
      {answerType !== "Text" && (
        <Button
          size="small"
          variant="contained"
          sx={{
            marginTop: 2,
            maxWidth: "10vw",
          }}
          onClick={handleOpenOptionDialog}
          endIcon={<PlusIcon />}
        >
          Option
        </Button>
      )}
      {showAlert && (
        <Alert severity="error" size="small">
          Can't add more than 4 options
        </Alert>
      )}

      <Dialog
        open={optionTypeDialog}
        onClose={() => handleCloseOptionDialog(false)}
      >
        <FormControl
          fullWidth
          sx={{
            px: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormLabel
            focused={false}
            sx={{ marginTop: 2, fontSize: "2rem", fontFamily: "revert" }}
          >
            Enter the option type
          </FormLabel>
          <DialogContent>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
              onChange={(e) => setOptionType(e.target.value)}
            >
              <FormControlLabel
                value="Text"
                control={<Radio size="small" checked={optionType === "Text"} />}
                label="Text"
              />
              <FormControlLabel
                value="Image"
                control={
                  <Radio size="small" checked={optionType === "Image"} />
                }
                label="Image"
              />
            </RadioGroup>
          </DialogContent>
        </FormControl>
        <Box
          sx={{
            paddingBottom: 4,
            display: "flex",
            alignItems: "center",
            gap: 4,
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            autoFocus
            onClick={() => handleCloseOptionDialog(true)}
          >
            Agree
          </Button>
          <Button
            variant="contained"
            autoFocus
            onClick={() => handleCloseOptionDialog(false)}
          >
            Disagree
          </Button>
        </Box>
      </Dialog>

      <Box>{showOption.map((option) => option)}</Box>
    </>
  );
};

export default Answer;
