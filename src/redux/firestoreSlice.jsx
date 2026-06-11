import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: null,
    usernames: null,
    deletedMessages: null,
    error: null,
};

const firestoreSlice = createSlice({
    name: "firestore",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            return { ...state, messages: action.payload };
        },
        setDeletedMessages: (state, action) => {
            return { ...state, deletedMessages: action.payload };
        },
        setUsernames: (state, action) => {
            return { ...state, usernames: action.payload };
        },
        setError: (state, action) => {
            return { ...state, error: action.payload };
        },
    },
});

export const {
    setMessages,
    setDeletedMessages,
    setUsernames,
    setError,
} = firestoreSlice.actions;

export default firestoreSlice.reducer;