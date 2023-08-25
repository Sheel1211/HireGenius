import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validateSingleQuestion = (singleQuestion) => {
    if (singleQuestion.questionCategory === "Text" && singleQuestion.question === "") {
        toast.warn('Please enter the question', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        return false;
    }
    else if (singleQuestion.questionCategory === "Image" && !(singleQuestion.questionImage)) {
        toast.warn('Please select a question image', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        return false;
    }
    else if (singleQuestion.questionCategory === "Image" && !(singleQuestion.questionImageDesc)) {
        toast.warn('Please select a question image description', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        return false;
    }
    else if (singleQuestion.answerType == "None") {
        toast.warn('Please select any answer-type', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        return false;
    }
    else if (singleQuestion.options.length < 2) {
        toast.warn('Please give atleast 2 options', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        return false;
    }
    else if (singleQuestion.answers.length === 0) {
        toast.warn('Please select your correct answers', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        return false;
    }

    return true;


}

export default validateSingleQuestion