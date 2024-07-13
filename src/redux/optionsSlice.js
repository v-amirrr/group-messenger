import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    optionsMessage: null,
    optionsAnimationStatus: 0,
};

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setOptionsMessage: (state, action) => {
            return { ...state, optionsMessage: action.payload }
        },
        setOptionsAnimationStatus: (state, action) => {
            return { ...state, optionsAnimationStatus: action.payload }
        },
        clearSlice: () => {
            return { optionsMessage: null, optionsAnimationStatus: 0 }
        },
    },
});

export const {
    setOptionsMessage,
    setOptionsAnimationStatus,
    clearSlice,
} = optionsSlice.actions;

export default optionsSlice.reducer;