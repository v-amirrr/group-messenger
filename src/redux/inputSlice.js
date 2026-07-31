import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inputReply: {
        id: null,
        message: null
    },
};

const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setInputReply: (state, action) => {
            return {
                ...state,
                inputReply: {
                    id: action.payload.id,
                    message: action.payload.message,
                },
            };
        },
    },
});

export const {
    setInputReply,
} = inputSlice.actions;

export default inputSlice.reducer;