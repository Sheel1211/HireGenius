import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    question: "What is java ?",
    options: ['Programming language', 'Used to create web sites', 'Both', 'None of them'],
    answers: ['Both'],
    questionType: "Quantitative",
    answerType: "Radio"
}, {
    question: "What is javascript ?",
    options: ['Programming language', 'Scripting language', 'Object oriented', 'None of them'],
    answers: ['Programming language', 'Scripting language', 'Object oriented'],
    questionType: "Quantitative",
    answerType: "Checkbox"
}, {
    question: "What is java ?",
    options: [],
    answers: [],
    questionType: "Quantitative",
    answerType: "Text"
}]

export const AptitudeSlice = createSlice({
    name: "Aptitude",
    initialState,
    reducers: {
        addQuestion(state, action) {
            state.push(action.payload);
        }
    }
});

export const { addQuestion } = AptitudeSlice.actions;
export default AptitudeSlice.reducer;
