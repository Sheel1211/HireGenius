import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const NewTab = () => {
  const [isNewTabOpened, setIsNewTabOpened] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsNewTabOpened(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <Dialog
        open={isNewTabOpened}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="warning" sx={{ fontSize: "16px" }}>
          <AlertTitle sx={{ fontSize: "24px" }}>Warning</AlertTitle>
          Do not try to leave the page otherwise you will be removed from the
          test
        </Alert>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={() => setIsNewTabOpened(false)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewTab;
