import { useDispatch, useSelector } from "react-redux";
import { setToasts, setCloseToast, setClearToasts } from "../redux/appSlice";
import { useEffect } from "react";

export const useToast = () => {
    const dispatch = useDispatch();
    const { toasts } = useSelector(store => store.appStore);

    useEffect(() => {
        let firstItem = toasts[0]?.time;
        toasts.length > 1 && closeToast(firstItem);
    }, [toasts]);

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