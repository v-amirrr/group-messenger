import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: null,
    error: null,
    loading: true,
    deletedMessages: null,
    usernames: null,
};

const firestoreSlice = createSlice({
    name: "firestore",
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
        setUsernames: (state, action) => {
            return { ...state, usernames: action.payload };
        },
    },
});

export const {
    setMessages,
    setError,
    setLoadingOn,
    setLoadingOff,
    setDeletedMessages,
    setUsernames
} = firestoreSlice.actions;

export default firestoreSlice.reducer;