import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    optionsMessage: null,
    optionsAnimationStatus: 0,
    optionsButtonsStage: 1,
    editedText: null,
};

// options buttons stages: 1 is chat/trash buttons, 2 is edit menu, 3 is edit confirmation

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

        setOptionsButtonsStage: (state, action) => {
            return { ...state, optionsButtonsStage: action.payload }
        },
        clearSlice: () => {
            return {
                optionsMessage: null,
                optionsAnimationStatus: 0,
                optionsButtonsStage: 1,
                editedText: null,
            }
        },
        setEditedText: (state, action) => {
            return { ...state, editedText: action.payload }
        },
    },
});

export const {
    setOptionsMessage,
    setOptionsAnimationStatus,
    setOptionsButtonsStage,
    clearSlice,
    setEditedText,
} = optionsSlice.actions;

export default optionsSlice.reducer;