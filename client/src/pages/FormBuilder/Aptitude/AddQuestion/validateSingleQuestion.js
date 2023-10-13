import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastWarning = (message) => {
  toast.warn(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

const validateSingleQuestion = (singleQuestion) => {
  if (singleQuestion.questionType === "") {
    toastWarning("Please enter the question type");
    return false;
  } else if (
    singleQuestion.questionCategory === "Text" &&
    singleQuestion.question === ""
  ) {
    toastWarning("Please enter the question");
    return false;
  } else if (
    singleQuestion.questionCategory === "Image" &&
    !singleQuestion.questionImage
  ) {
    toastWarning("Please select a question image");
    return false;
  } else if (
    singleQuestion.questionCategory === "Image" &&
    !singleQuestion.questionImageDesc
  ) {
    toastWarning("Please select a question image description");
    return false;
  } else if (singleQuestion.answerType == "None") {
    toastWarning("Please select any answer-type");
    return false;
  } else if (singleQuestion.options.length < 2) {
    toastWarning("Please give atleast 2 options");
    return false;
  } else if (singleQuestion.answers.length === 0) {
    toastWarning("Please select your correct answers");
    return false;
  } else if (
    singleQuestion.answerType === "Radio" &&
    singleQuestion.answers.length > 1
  ) {
    toastWarning("There should be only one possible answer in type radio");
    return false;
  }

  console.log(singleQuestion);

  return true;
};

export default validateSingleQuestion;
