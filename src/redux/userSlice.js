import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginError: null,
    warningPageShow: false,
    warningPageNeverShowCheck: JSON.parse(localStorage.getItem("warning-check")),
    loginAsGuest: JSON.parse(localStorage.getItem("guest-login")),
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
    },
});

export const { 
    setLoginError, 
    setWarningShow, 
    setWarningPageNeverShowCheck, 
    setLoginAsGuest 
} = userSlice.actions;

export default userSlice.reducer;