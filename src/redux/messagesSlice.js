import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: null,
    error: null,
    loading: false,
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            return { ...state, messages: action.payload };
        },
        setError: (state, action) => {
            return { ...state, error: action.payload };
        },
        setLoadingOn: state => {
            return { ...state, loading: true };
        },
        setLoadingOff: state => {
            return { ...state, loading: false };
        },
    },
});

export const { setMessages, setError, setLoadingOn, setLoadingOff } = messagesSlice.actions;

export default messagesSlice.reducer;