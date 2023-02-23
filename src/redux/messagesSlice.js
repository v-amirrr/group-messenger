import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    localUsername: null,
    messages: null,
    error: null,
    loading: true,
    popup: { show: false, type: 0, id: null },
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
        setPopup: (state, action) => {
            return { 
                ...state, 
                popup: { 
                    show: action.payload.show, 
                    type: action.payload.type,
                    id: action.payload.id
                }
            };
        },
    },
});

export const { 
    setMessages, 
    setError, 
    setLoadingOn, 
    setLoadingOff, 
    setLocalUsername, 
    setPopup,
} = messagesSlice.actions;

export default messagesSlice.reducer;