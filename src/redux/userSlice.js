import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    guestLogin: JSON.parse(localStorage.getItem('guest-login')),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, user: action.payload };
        },
        setGuestLogin: (state, action) => {
            return { ...state, guestLogin: action.payload };
        },
    },
});

export const {
    setUser,
    setGuestLogin,
} = userSlice.actions;

export default userSlice.reducer;
