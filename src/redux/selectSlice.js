import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedMessages: [],
    nonLocalSelected: 0,
};

const selectSlice = createSlice({
    name: 'select',
    initialState,
    reducers: {
        addSelectedMessages: (state, action) => {
            return {
                ...state,
                selectedMessages: [
                    ...state.selectedMessages,
                    action.payload.message,
                ],
            };
        },
        setSelectedMessages: (state, action) => {
            return { ...state, selectedMessages: action.payload };
        },
        plusNonLocalSelected: (state) => {
            return { ...state, nonLocalSelected: state.nonLocalSelected+1 };
        },
        minusNonLocalSelected: (state) => {
            return { ...state, nonLocalSelected: state.nonLocalSelected-1 };
        },
        clearNonLocalSelected: (state) => {
            return { ...state, nonLocalSelected: 0 };
        },
    },
});

export const {
    addSelectedMessages,
    setSelectedMessages,
    plusNonLocalSelected,
    minusNonLocalSelected,
    clearNonLocalSelected,
} = selectSlice.actions;

export default selectSlice.reducer;