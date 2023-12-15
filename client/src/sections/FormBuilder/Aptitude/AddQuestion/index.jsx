import React, { useEffect, useState } from "react";
import { Button, FormControl, Stack } from "@mui/material";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../../../utils/config";

const index = ({
  interviewId,
  setIsOpen,
  setToastMessage,
  allRounds,
  interviewDetails,
}) => {
  const dispatch = useDispatch();
  const singleQuestion = useSelector((state) => state.SingleQuestion);
  const Aptitude = useSelector((state) => state.Aptitude);
  const [isQuestionAdded, setIsQuestionAdded] = useState(false);
  const [time, setTime] = useState(60);
  // const [expiryDate, setExpiryDate] = useState(dayjs());
  const navigate = useNavigate();

  const roundKey =
    "Aptitude" + interviewDetails._id + "-" + allRounds.length + 1;

  useEffect(() => {
    if (!isQuestionAdded) return;
    localStorage.setItem(roundKey, JSON.stringify(Aptitude));
  }, [isQuestionAdded]);

  useEffect(() => {
    const allQuestions = localStorage.getItem(roundKey);
    if (!allQuestions) return;
    dispatch(addMultipleQuestions(JSON.parse(allQuestions)));
  }, []);

  const handleSubmit = () => {
    if (validateSingleQuestion(singleQuestion)) {
      dispatch(addQuestion(singleQuestion));
      dispatch(clearQuestion());
      setIsQuestionAdded(true);
      setIsOpen(true);
      setToastMessage(
        'Question is added. You can check all questions by clicking on the button "Shows Question"'
      );
      // localStorage.removeItem("Aptitude");
    }
  };

  const questions = useSelector((state) => state.Aptitude);

  const handleGenerateLink = () => {
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

    // if (allRounds.length === 0) {
    const data = {
      interviewId,
      questions,
    };

    axios
      .post("http://localhost:4000/api/create/aptitude", data, config)
      .then((res) => {
        console.log(res);
        // setLink(res.data.AptitudeLink);
        localStorage.setItem("AptitudeLink", res.data.AptitudeLink);
        localStorage.removeItem(roundKey);
        const interview = interviewDetails;
        navigate(
          `/${interviewDetails.title.split(" ").join("-").toLowerCase()}`,
          {
            state: interview,
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // } else {
    // const prevRound = allRounds[allRounds.length - 1];
    // const data = {
    //   interviewId,
    //   questions,
    //   prevRoundId: prevRound.roundId,
    // };
    // if (prevRound.name === "Aptitude") {
    // axios
    //   .post("http://localhost:4000/api/create/another/aptitude", data, config)
    //   .then((res) => {
    //     console.log(res);
    //     // setLink(res.data.AptitudeLink);
    //     localStorage.setItem("AptitudeLink", res.data.AptitudeLink);
    //     localStorage.removeItem(roundKey);
    //     const interview = interviewDetails;
    //     navigate(
    //       `/${interviewDetails.title.split(" ").join("-").toLowerCase()}`,
    //       {
    //         state: interview,
    //       }
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
    // }
  };

  return (
    <>
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
            onClick={handleGenerateLink}
          >
            Generate Link
          </Button>
        </Stack>
      </FormControl>
    </>
  );
};

export default index;
