import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
    login: { loading: false, error: null },
    signup: { loading: false, error: null },
    googleLogin: { loading: false, error: null },
    enterAsAGuest: JSON.parse(localStorage.getItem("guest-login")),
    warningPageShowed: false,
    warningPageNeverShowCheck: JSON.parse(localStorage.getItem("warning-check")),
    messageIdOptionsShow: null,
    theme: 4,
    selectedMessages: [],
    selectOthersMessage: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setWarningShowed: (state, action) => {
            return { ...state, warningPageShowed: action.payload };
        },
        setWarningPageNeverShowCheck: (state, action) => {
            return { ...state, warningPageNeverShowCheck: action.payload };
        },
        setMessageIdOptionsShow: (state, action) => {
            return { ...state, messageIdOptionsShow: action.payload };
        },
        setTheme: (state, action) => {
            return { ...state, theme: action.payload };
        },
        setUser: (state, action) => {
            return { ...state, user: action.payload };
        },
        setLogin: (state, action) => {
            return { ...state, login: { loading: action.payload.loading, error: action.payload.error } };
        },
        setSignup: (state, action) => {
            return { ...state, signup: { loading: action.payload.loading, error: action.payload.error } };
        },
        setEnterAsAGuest: (state, action) => {
            return { ...state, enterAsAGuest: action.payload };
        },
        setGoogleLogin: (state, action) => {
            return { ...state, googleLogin: { loading: action.payload.loading, error: action.payload.error } };
        },
        setSelectedMessages: (state, action) => {
            return { 
                ...state, 
                selectedMessages: [ 
                    ...state.selectedMessages, 
                    action.payload.message,
                ]
            };
        },
        setClearSelectedMessages: (state) => {
            return { ...state, selectedMessages: [] };
        },
        setUnselectMessages: (state, action) => {
            return { ...state, selectedMessages: action.payload };
        },
        setSelectOthersMessage: (state, action) => {
            return { ...state, selectOthersMessage: action.payload };
        },
    },
});

export const { 
    setWarningShowed,
    setWarningPageNeverShowCheck,
    setMessageIdOptionsShow,
    setTheme,
    setUser,
    setLogin,
    setSignup,
    setEnterAsAGuest,
    setGoogleLogin,
    setSelectedMessages,
    setClearSelectedMessages,
    setUnselectMessages,
    setSelectOthersMessage,
} = userSlice.actions;

export default userSlice.reducer;