import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginError: null,
    warningPageShow: false,
    warningPageNeverShowCheck: JSON.parse(localStorage.getItem("warning-check")),
    loginAsGuest: JSON.parse(localStorage.getItem("guest-login")),
    messageIdOptionsShow: null,
    theme: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoginError: (state, action) => {
            return { ...state, loginError: action.payload };
        },
        setWarningShow: (state, action) => {
            return { ...state, warningPageShow: action.payload };
        },
        setWarningPageNeverShowCheck: (state, action) => {
            return { ...state, warningPageNeverShowCheck: action.payload };
        },
        setLoginAsGuest: (state, action) => {
            return { ...state, loginAsGuest: action.payload };
        },
        setMessageIdOptionsShow: (state, action) => {
            return { ...state, messageIdOptionsShow: action.payload };
        },
        setTheme: (state, action) => {
            return { ...state, theme: action.payload };
        },
    },
});

export const { 
    setLoginError, 
    setWarningShow, 
    setWarningPageNeverShowCheck, 
    setLoginAsGuest,
    setMessageIdOptionsShow,
    setTheme,
} = userSlice.actions;

export default userSlice.reducer;