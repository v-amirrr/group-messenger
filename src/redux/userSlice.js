import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginError: null,
    warningPageShow: false,
    warningPageNeverShowCheck: false,
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
    },
});

export const { setLoginError, setWarningShow, setWarningPageNeverShowCheck } = userSlice.actions;

export default userSlice.reducer;