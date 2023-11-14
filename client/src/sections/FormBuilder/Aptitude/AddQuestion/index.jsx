import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  FormControl,
  Dialog,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Question from "./Question";
import Answer from "./Answer";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  addMultipleQuestions,
} from "../../../../store/slices/AptitudeSlice";
import validateSingleQuestion from "./validateSingleQuestion";
import { clearQuestion } from "../../../../store/slices/SingleQuestion";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import config from "../../../../utils/config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const index = ({ interviewId, setIsOpen, setToastMessage }) => {
  // It will show the popup when you reload the page
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = "";
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const location = useLocation();
  const dispatch = useDispatch();
  const singleQuestion = useSelector((state) => state.SingleQuestion);
  const Aptitude = useSelector((state) => state.Aptitude);
  const [isQuestionAdded, setIsQuestionAdded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = useState(60);
  const [negativeMarking, setNegativeMarking] = useState(0);
  const [link, setLink] = useState(null);
  const [linkmodal, setLinkModal] = useState(false);
  const [expiryDate, setExpiryDate] = useState(dayjs());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isQuestionAdded) return;
    localStorage.setItem("Aptitude", JSON.stringify(Aptitude));
  }, [isQuestionAdded]);

  useEffect(() => {
    const allQuestions = JSON.parse(localStorage.getItem("Aptitude"));
    if (allQuestions) {
      dispatch(addMultipleQuestions(allQuestions));
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (validateSingleQuestion(singleQuestion)) {
      dispatch(addQuestion(singleQuestion));
      dispatch(clearQuestion());
      setIsQuestionAdded(true);
      setIsOpen(true);
      setToastMessage(
        'Question is added. You can check all questions by clicking on the button "Shows Question"'
      );
    }
  };

  const questions = useSelector((state) => state.Aptitude);

  const handleDuration = () => {
    if (questions.length === 0) {
      toast.warn("Please add some questions...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setOpen(true);
  };

  const handleGenerateLink = () => {
    const data = {
      interviewId,
      questions,
      duration: time,
      negativeMarking: negativeMarking,
      expiryDate,
    };

    axios
      .post("http://localhost:4000/api/create/aptitude", data, config)
      .then((res) => {
        console.log(res);
        alert(res.data.AptitudeLink);
        setLink(res.data.AptitudeLink);
        localStorage.setItem("AptitudeLink", res.data.AptitudeLink);
        setLinkModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  // TO copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Link copied to clipboard: " + link);
      })
      .catch((error) => {
        console.error("Error copying link to clipboard: ", error);
      });
    setLinkModal(false);
    navigate("/clientdashboard");
  };

  return (
    <>
      {linkmodal && (
        <Dialog
          maxWidth="md"
          open={linkmodal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ my: 2 }}>
              Copy Link
            </Typography>
            <TextField
              fullWidth
              label="Copy link"
              variant="outlined"
              value={link}
            />
          </Box>
          <DialogActions>
            <Button onClick={() => setLinkModal(false)}>Close</Button>
            <Button onClick={handleCopyLink}>Copy</Button>
          </DialogActions>
        </Dialog>
      )}

      <FormControl fullWidth>
        <Question />
        <Answer isQuestionAdded={isQuestionAdded} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={4}
          sx={{ mt: 2 }}
        >
          <Button
            fullWidth
            color="inherit"
            type="submit"
            size="medium"
            variant="contained"
            onClick={handleSubmit}
          >
            Add Question
          </Button>
          <Button
            fullWidth
            color="inherit"
            type="submit"
            size="medium"
            variant="contained"
            onClick={handleDuration}
          >
            Generate Link
          </Button>
        </Stack>
      </FormControl>
      <Dialog
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ p: 4 }}>
          <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
              Select Aptitude Duration in Minutes
            </Typography>
            <TextField
              fullWidth
              label="Time (in minutes)"
              variant="outlined"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
              Negative marking (0% means no negative marking)
            </Typography>
            <TextField
              fullWidth
              label="Negative marking (in percentage)"
              variant="outlined"
              type="number"
              value={negativeMarking}
              onChange={(e) => setNegativeMarking(e.target.value)}
            />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
              Set expiry date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Expiry Date"
                  value={expiryDate}
                  onChange={(date) => setExpiryDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Box>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Disagree
          </Button>
          <Button color="inherit" onClick={handleGenerateLink}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default index;
