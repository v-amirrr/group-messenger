import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginError: null,
    warningPageShow: false,
    warningPageNeverShowCheck: JSON.parse(localStorage.getItem("warning-check")),
    loginAsGuest: JSON.parse(localStorage.getItem("guest-login")),
    emojiPickerShow: false,
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
        setEmojiPickerShow: (state, action) => {
            return { ...state, emojiPickerShow: action.payload };
        },
    },
});

export const { 
    setLoginError, 
    setWarningShow, 
    setWarningPageNeverShowCheck, 
    setLoginAsGuest,
    setEmojiPickerShow
} = userSlice.actions;

export default userSlice.reducer;