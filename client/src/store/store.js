import { configureStore } from '@reduxjs/toolkit';
import { AptitudeSlice } from './slices/AptitudeSlice';
import { SingleQuestionSlice } from './slices/SingleQuestion';

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        Aptitude: AptitudeSlice.reducer,
        SingleQuestion: SingleQuestionSlice.reducer
    },
});
