import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: null,
    error: null,
    loading: true,
    deletedMessages: null,
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
        setDeletedMessages: (state, action) => {
            return { ...state, deletedMessages: action.payload };
        },
    },
});

export const {
    setMessages,
    setError,
    setLoadingOn,
    setLoadingOff,
    setDeletedMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;