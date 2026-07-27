import React from 'react'
import { useDispatch } from 'react-redux';
import { setToasts, setCloseToast, setClearToasts } from '../redux/appSlice';

export const useToast = () => {
    const dispatch = useDispatch();

    const openToast = (message, type) => {
        let time = new Date().getTime();
        dispatch(setToasts({
            show: true,
            message,
            type,
            time,
        }));
        setTimeout(() => {
            closeToast(time);
        }, type === 'ERROR' ? 6000 : 3000);
    };

    const closeToast = (time) => {
        dispatch(setCloseToast(time));
    };

    const clearToasts = () => {
        dispatch(setClearToasts());
    };

    return {
        openToast,
        closeToast,
        clearToasts,
    };
};