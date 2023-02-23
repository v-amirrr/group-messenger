import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    loading: false,
    replyTo: { id: null, message: null, username: null },
};

const messagesSlice = createSlice({
    name: "sendMessage",
    initialState,
    reducers: {
        setSendMessageError: (state, action) => {
            return { ...state, error: action.payload };
        },
        setSendMessageLoading: (state, action) => {
            return { ...state, loading: action.payload };
        },
        setSendMessageReplyTo: (state, action) => {
            return { 
                ...state, 
                replyTo: { 
                    id: action.payload.id,
                    message: action.payload.messageText,
                    username: action.payload.username,
                }, 
            };
        },
        setClearReplyTo: (state) => {
            return {
                ...state,
                replyTo: {
                    id: null,
                    message: null,
                    username: null,
                }
            }
        },
    },
});

export const { 
    setSendMessageError,
    setSendMessageLoading,
    setSendMessageReplyTo,
    setClearReplyTo,
} = messagesSlice.actions;

export default messagesSlice.reducer;