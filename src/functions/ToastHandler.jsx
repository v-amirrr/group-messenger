import { setClearToasts, setCloseToast, setToasts } from "../redux/appSlice";

export const openToast = (dispatch, message, type) => {
    let time = new Date().getTime();
    dispatch(setToasts({
        show: true,
        message,
        type,
        time,
    }));
    setTimeout(() => {
        closeToast(dispatch, time);
    }, type === 'ERROR' ? 6000 : 3000);
};

export const closeToast = (dispatch, time) => {
    dispatch(setCloseToast(time));
};

export const clearToasts = (dispatch) => {
    dispatch(setClearToasts());
};