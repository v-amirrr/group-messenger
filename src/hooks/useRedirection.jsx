import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearSelectSlice } from "../redux/selectSlice";
import { setClearToasts } from "../redux/toastSlice";
import { useEffect } from "react";
import { useToast } from '../hooks/useToast';

export const useRedirection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user, guestLogin } = useSelector(store => store.userStore);
    const { openToast, clearToasts } = useToast();

    useEffect(() => {
        autoRedirection(location.pathname);
    }, [location.pathname]);

    const messengerRedirection = () => {
        if (!user && !guestLogin) {
            navigate("/auth", { replace: true });
        }
    };

    const authRedirection = () => {
        if (localStorage.getItem('guest-login') || localStorage.getItem('user')) {
            navigate("/", { replace: true });
        }
    };

    const settingsRedirection = () => {
        if (!user && !guestLogin) {
            navigate("/auth", { replace: true });
        }
    };

    const trashRedirection = () => {
        if (guestLogin) {
            openToast("To use this feature you need to ", "GUEST");
            navigate("/", { replace: true });
        }
    };

    const autoRedirection = (path) => {
        clearToasts();
        dispatch(clearSelectSlice());
        switch (path) {
            case '/':
                messengerRedirection();
                break;

            case '/auth':
                authRedirection();
                break;

            case '/settings':
                settingsRedirection();
                break;

            case '/trash':
                trashRedirection();
                break;

            default:
                break;
        }
    };

    return { autoRedirection };
};