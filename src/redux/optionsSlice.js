import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    optionsMessage: null,
    optionsAnimationStatus: 0,
    showOptionsButtons: true,
    showEditButtons: false,
    editText: false,
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
        setShowOptionsButtons: (state, action) => {
            return { ...state, showOptionsButtons: action.payload }
        },
        setShowEditButtons: (state, action) => {
            return { ...state, showEditButtons: action.payload }
        },
        setEditText: (state, action) => {
            return { ...state, editText: action.payload }
        },
        reset: () => {
            return {
                optionsMessage: null,
                optionsAnimationStatus: 0,
                showOptionsButtons: true,
                showEditButtons: false,
                editText: false,
            }
        },
    },
});

export const {
    setOptionsMessage,
    setOptionsAnimationStatus,
    clearSlice,
    setShowOptionsButtons,
    setShowEditButtons,
    setEditText,
    reset,
} = optionsSlice.actions;

export default optionsSlice.reducer;