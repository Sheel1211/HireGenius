import { createSlice } from "@reduxjs/toolkit";
import { QUANTITATIVE, REASONING, TECHNICAL, VERBAL } from "../../utils/helper";
import dayjs from "dayjs";

const initialState = {
  questions: [],
  quantitativeQuestions: [],
  reasoningQuestions: [],
  verbalQuestions: [],
  technicalQuestions: [],
  sections: {},
  selectedIndex: [],
  selectedSection: "",
  isLoading: true,
  selectedOptions: [],
  selectedPage: "0",
  duration: 0,
  negativeMarking: 0,
  startTime: dayjs(),
  endTime: dayjs(),
  testDuration: 60,
  isActiveLinkIsuueOccurs: false,
};

export const AptiDashboardSlice = createSlice({
  name: "AptiDashboard",
  initialState,
  reducers: {
    setQuestions(state, action) {
      return { ...state, questions: action.payload };
    },
    setQuantitativeQuestions(state, action) {
      const quantitativeQuestions = action.payload
        .filter((question) => question.questionType === "Quantitative")
        .map((question) => question);
      return { ...state, quantitativeQuestions };
    },
    setReasoningQuestions(state, action) {
      const reasoningQuestions = action.payload
        .filter((question) => question.questionType === "Reasoning")
        .map((question) => question);
      return { ...state, reasoningQuestions };
    },
    setVerbalQuestions(state, action) {
      const verbalQuestions = action.payload
        .filter((question) => question.questionType === "Verbal")
        .map((question) => question);
      return { ...state, verbalQuestions };
    },
    setTechnicalQuestions(state, action) {
      const technicalQuestions = action.payload
        .filter((question) => question.questionType === "Technical")
        .map((question) => question);
      return { ...state, technicalQuestions };
    },
    setIsLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
    setSelectedIndex(state, action) {
      return { ...state, selectedIndex: action.payload };
    },
    setSelectedSection(state, action) {
      return { ...state, selectedSection: action.payload };
    },
    setSections(state, action) {
      const sectionMap = {};
      action.payload.forEach((question) => {
        if (question.questionType === QUANTITATIVE) {
          if (QUANTITATIVE in sectionMap) {
            sectionMap[QUANTITATIVE].push({ ...question, selectedOptions: [] });
            // sectionMap[QUANTITATIVE].push(question);
          } else {
            sectionMap[QUANTITATIVE] = [{ ...question, selectedOptions: [] }];
            // sectionMap[QUANTITATIVE] = [question];
          }
        } else if (question.questionType === REASONING) {
          if (REASONING in sectionMap) {
            sectionMap[REASONING].push({ ...question, selectedOptions: [] });
            // sectionMap[REASONING].push(question);
          } else {
            sectionMap[REASONING] = [{ ...question, selectedOptions: [] }];
            // sectionMap[REASONING] = [question];
          }
        } else if (question.questionType === VERBAL) {
          if (VERBAL in sectionMap) {
            sectionMap[VERBAL].push({ ...question, selectedOptions: [] });
            // sectionMap[VERBAL].push(question);
          } else {
            sectionMap[VERBAL] = [{ ...question, selectedOptions: [] }];
            // sectionMap[VERBAL] = [question];
          }
        } else if (question.questionType === TECHNICAL) {
          if (TECHNICAL in sectionMap) {
            sectionMap[TECHNICAL].push({ ...question, selectedOptions: [] });
            // sectionMap[TECHNICAL].push(question);
          } else {
            sectionMap[TECHNICAL] = [{ ...question, selectedOptions: [] }];
            // sectionMap[TECHNICAL] = [question];
          }
        }
      });

      return { ...state, sections: sectionMap };
    },
    addSelectedOptions(state, action) {
      const { e, section, questionIndex, optionIndex, type } = action.payload;
      const updatedSections = { ...state.sections };
      const updatedQuestions = [...updatedSections[section]];
      const updatedQuestion = { ...updatedQuestions[questionIndex] };

      if (e.target.type === "radio") {
        updatedQuestion.selectedOptions = [];
        updatedQuestion.selectedOptions.push(optionIndex);
      } else if (e.target.type === "checkbox") {
        const index = updatedQuestion.selectedOptions.indexOf(optionIndex);
        if (index == -1) {
          updatedQuestion.selectedOptions.push(optionIndex);
        } else {
          updatedQuestion.selectedOptions.splice(index, 1);
        }
      }
      updatedQuestions[questionIndex] = updatedQuestion;
      updatedSections[section] = updatedQuestions;
      state.sections = updatedSections;
    },
    setSelectedPage(state, action) {
      return { ...state, selectedPage: action.payload };
    },
    setDuration(state, action) {
      return { ...state, duration: action.payload };
    },
    setNegativeMarking(state, action) {
      return { ...state, negativeMarking: action.payload };
    },
    setColor(state, action) {
      const { selectedQuestionIdx, currentSection } = action.payload;
      const updatedSections = { ...state.sections };
      const updatedQuestions = [...updatedSections[currentSection]];
      const updatedQuestion = {
        ...updatedQuestions[selectedQuestionIdx],
        color: action.payload?.color ? action.payload.color : "secondary",
      };

      updatedQuestions[selectedQuestionIdx] = updatedQuestion;
      updatedSections[currentSection] = updatedQuestions;
      state.sections = updatedSections;
    },
    clearQuestion(state, action) {
      const { selectedQuestionIdx, currentSection } = action.payload;
      const updatedSections = { ...state.sections };
      const updatedQuestions = [...updatedSections[currentSection]];
      const updatedQuestion = {
        ...updatedQuestions[selectedQuestionIdx],
        selectedOptions: [],
      };

      updatedQuestions[selectedQuestionIdx] = updatedQuestion;
      updatedSections[currentSection] = updatedQuestions;
      state.sections = updatedSections;
    },
    setStartTime(state, action) {
      state.startTime = action.payload;
    },
    setEndTime(state, action) {
      state.endTime = action.payload;
    },
    setTestDuration(state, action) {
      state.testDuration = action.payload;
    },
    setIsActiveLinkIsuueOccurs(state, action) {
      state.isActiveLinkIsuueOccurs = action.payload;
    },
  },
});

export const {
  setQuestions,
  setQuantitativeQuestions,
  setReasoningQuestions,
  setTechnicalQuestions,
  setVerbalQuestions,
  setIsLoading,
  setSelectedIndex,
  setSelectedSection,
  setSections,
  addSelectedOptions,
  setSelectedPage,
  setDuration,
  setNegativeMarking,
  setColor,
  clearQuestion,
  setStartTime,
  setEndTime,
  setTestDuration,
  setIsActiveLinkIsuueOccurs,
} = AptiDashboardSlice.actions;
export default AptiDashboardSlice.reducer;
