import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: null,
    usernames: null,
    deletedMessages: null,
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
    },
});

export const {
    setMessages,
    setDeletedMessages,
    setUsernames,
} = firestoreSlice.actions;

export default firestoreSlice.reducer;