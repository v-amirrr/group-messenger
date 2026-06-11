import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
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
        setEnterAsAGuest: (state, action) => {
            return { ...state, enterAsAGuest: action.payload };
        },
    },
});

export const {
    setUser,
    setEnterAsAGuest,
} = userSlice.actions;

export default userSlice.reducer;
