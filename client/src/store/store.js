import { configureStore } from '@reduxjs/toolkit';
import { AptitudeSlice } from './slices/AptitudeSlice';

export const store = configureStore({
    reducer: {
        Aptitude: AptitudeSlice.reducer
    },
});
