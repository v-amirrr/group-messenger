import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    login: { loading: false, error: null },
    signup: { loading: false, error: null },
    googleLogin: { loading: false, error: null },
    enterAsAGuest: JSON.parse(localStorage.getItem('guest-login')),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, user: action.payload };
        },
        setLogin: (state, action) => {
            return {
                ...state,
                login: {
                    loading: action.payload.loading,
                    error: action.payload.error,
                },
            };
        },
        setSignup: (state, action) => {
            return {
                ...state,
                signup: {
                    loading: action.payload.loading,
                    error: action.payload.error,
                },
            };
        },
        setEnterAsAGuest: (state, action) => {
            return { ...state, enterAsAGuest: action.payload };
        },
        setGoogleLogin: (state, action) => {
            return {
                ...state,
                googleLogin: {
                    loading: action.payload.loading,
                    error: action.payload.error,
                },
            };
        },
    },
});

export const {
    setUser,
    setLogin,
    setSignup,
    setEnterAsAGuest,
    setGoogleLogin,
} = userSlice.actions;

export default userSlice.reducer;
