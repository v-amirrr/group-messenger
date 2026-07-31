import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toasts: [],
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToasts: (state, action) => {
            return {
                ...state,
                toasts: [
                    ...state.toasts,
                    {
                        show: action.payload.show,
                        message: action.payload.message,
                        type: action.payload.type,
                        time: action.payload.time,
                    },
                ],
            };
        },
        setCloseToast: (state, action) => {
            return {
                ...state,
                toasts: [
                    ...state.toasts.filter(toast => toast.time != action.payload),
                ],
            };
        },
        setClearToasts: (state) => {
            return {
                ...state,
                toasts: [],
            };
        },
    },
});

export const {
    setToasts,
    setCloseToast,
    setClearToasts,
} = toastSlice.actions;

export default toastSlice.reducer;