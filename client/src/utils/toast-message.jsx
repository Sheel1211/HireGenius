import { Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";

const vertical = "top";
const horizontal = "center";
const CustomeSnackBar = ({ isOpen, message, handleClose }) => {
  return (
    <>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={isOpen}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </>
  );
};

export default CustomeSnackBar;
