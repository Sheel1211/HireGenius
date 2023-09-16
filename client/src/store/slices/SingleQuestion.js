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
    setAnswerType(state, action) {
      state.answerType = action.payload;
    },
    setOptions(state, action) {
      const { value, optionNumber } = action.payload;
      state.options[optionNumber - 1] = {
        option: value,
        optionURL: action.payload.imageURL ? action.payload.imageURL : "",
      };
    },
    setAnswers(state, action) {
      const { optionNumber, e } = action.payload;

      if (e.target.checked) {
        if (!state.answers.includes(optionNumber)) {
          state.answers.push(optionNumber);
        }
      } else {
        state.answers = state.answers.filter(
          (number) => number !== optionNumber
        );
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
} = SingleQuestionSlice.actions;
export default SingleQuestionSlice.reducer;
