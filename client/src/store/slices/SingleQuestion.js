import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionCategory: "",
  questionType: "",
  question: "",
  questionImage: "",
  questionImageURL: "",
  questionImageDesc: "",
  answerType: "None",
  options: [],
  answers: [],
  questionMarks: 1,
};

export const SingleQuestionSlice = createSlice({
  name: "SingleQuestion",
  initialState,
  reducers: {
    setQuestionCategory(state, action) {
      state.questionCategory = action.payload;
    },
    setQuestionType(state, action) {
      state.questionType = action.payload;
    },
    setQuestion(state, action) {
      state.question = action.payload;
    },
    setQuestionImage(state, action) {
      state.questionImage = action.payload;
    },
    setQuestionImageURL(state, action) {
      state.questionImageURL = action.payload;
    },
    setQuestionImageDesc(state, action) {
      state.questionImageDesc = action.payload;
    },
    setQuestionMarks(state, action) {
      state.questionMarks = action.payload;
    },
    setAnswerType(state, action) {
      state.answerType = action.payload;
    },
    setOptions(state, action) {
      const { value, optionNumber } = action.payload;
      console.log(action.payload);
      state.options[optionNumber - 1] = {
        option: value,
        optionURL: action.payload.imageURL ? action.payload.imageURL : "",
      };
    },
    setAnswers(state, action) {
      const { SingleQuestion, optionNumber, e } = action.payload;

      console.log(action.payload);

      const answers = Array.from(new Set(SingleQuestion.answers));
      const optionValue = SingleQuestion.options[optionNumber - 1].option;

      if (e.target.checked) {
        if (!answers.includes(optionValue)) {
          answers.push(optionValue);
          return { ...state, answers };
        }
      } else {
        if (answers.includes(optionValue)) {
          answers.splice(answers.indexOf(optionValue), 1);
        }
        return { ...state, answers };
      }
    },
    clearQuestion(state, action) {
      state.question = "";
      state.questionCategory = "";
      state.questionType = "";
      state.question = "";
      state.questionImage = "";
      state.questionImageURL = "";
      state.questionImageDesc = "";
      state.answerType = "None";
      state.options = [];
      state.answers = [];
      state.questionMarks = 1;
    },
  },
});

export const {
  setQuestionType,
  setQuestionCategory,
  setQuestion,
  setQuestionImage,
  setQuestionImageURL,
  setQuestionImageDesc,
  setAnswerType,
  setOptions,
  setAnswers,
  clearQuestion,
  setQuestionMarks,
} = SingleQuestionSlice.actions;
export default SingleQuestionSlice.reducer;
