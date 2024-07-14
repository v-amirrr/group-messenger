import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    optionsMessage: null,
    optionsAnimationStatus: 0,
    showEditButtons: false,
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
        setShowEditButtons: (state, action) => {
            return { ...state, showEditButtons: action.payload }
        },
    },
});

export const {
    setOptionsMessage,
    setOptionsAnimationStatus,
    clearSlice,
    setShowEditButtons,
} = optionsSlice.actions;

export default optionsSlice.reducer;