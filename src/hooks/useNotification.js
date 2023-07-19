import { useDispatch } from "react-redux";
import { setNotification } from "../redux/userSlice";

export const useNotification = () => {

    const dispatch = useDispatch();

    const openNotification = (message, error) => {
        dispatch(setNotification({ open: true, message: message, error: error }));
        setTimeout(() => {
            closeNotification();
        }, 5000);
    };

    const closeNotification = () => {
        dispatch(setNotification({ open: false, message: null, error: false }));
    };

    return { openNotification, closeNotification };
};