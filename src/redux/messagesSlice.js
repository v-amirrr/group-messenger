import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    localUsername: null,
    messages: null,
    error: null,
    loading: true,
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
        setLocalUsername: (state, action) => {
            return { ...state, localUsername: action.payload };
        },
    },
});

export const { setMessages, setError, setLoadingOn, setLoadingOff, setLocalUsername } = messagesSlice.actions;

export default messagesSlice.reducer;