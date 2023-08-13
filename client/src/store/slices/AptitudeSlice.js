import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        question: "What is java ?",
        questionImageURL: "",
        questionImageDesc: "",
        options: [{ option: 'Programming language' }, { option: 'Used to create web sites' }, { option: 'Both' }, { option: 'None of them' }],
        answers: ['Both'],
        questionType: "Quantitative",
        answerType: "Radio"
    }, {
        question: "What is javascript ?",
        questionImageURL: "",
        questionImageDesc: "",
        options: [{ option: 'Programming language' }, { option: 'Scripting language' }, { option: 'Object oriented' }, { option: 'None of them' }],
        answers: ['Programming language', 'Scripting language', 'Object oriented'],
        questionType: "Quantitative",
        answerType: "Checkbox"
    }, {
        question: "",
        questionImageURL: "https://meritnotes.com/adminotes/images/online-puzzles-test-11.png",
        questionImageDesc: "Analize the image",
        options: [],
        answers: [],
        questionType: "Quantitative",
        answerType: "Text"
    },
]

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
