import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      <TextField
        fullWidth
        multiline
        rows={5}
        variant="outlined"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        sx={{
          mt: 2,
          "& textarea": {
            borderRadius: "md",
            boxShadow: "5px 5px 0px 0px rgba(0, 0, 0, 0.2)",
            transition: "box-shadow 0.2s",
            "&:hover": {
              boxShadow: "5px 5px 0px 0px rgba(0, 0, 0, 0.4)",
            },
          },
        }}
      />
    </>
  );
};

export default CustomInput;
