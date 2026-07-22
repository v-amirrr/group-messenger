import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearNonLocalSelected, setSelectedMessages } from "../redux/selectSlice";
import { setClearToasts } from "../redux/appSlice";
import { useEffect } from "react";
import { clearToasts, openToast } from "../functions/ToastHandler";

export const useRedirection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user, enterAsAGuest } = useSelector(store => store.userStore);

    useEffect(() => {
        autoRedirection(location.pathname);
    }, [location.pathname]);

    const clearSelectedMessages = () => {
        dispatch(clearNonLocalSelected());
        dispatch(setSelectedMessages([]));
    };

    const ClearToasts = () => {
        clearToasts(dispatch);
    };

    const messengerRedirection = () => {
        if (!user && !enterAsAGuest) {
            navigate("/auth", { replace: true });
        }
    };

    const authRedirection = () => {
        if (localStorage.getItem('guest-login') || localStorage.getItem('user')) {
            navigate("/", { replace: true });
        }
    };

    const settingsRedirection = () => {
        if (!user && !enterAsAGuest) {
            navigate("/auth", { replace: true });
        }
    };

    const trashRedirection = () => {
        if (enterAsAGuest) {
            openToast(dispatch, "To use this feature you need to ", "GUEST");
            navigate("/", { replace: true });
        }
    };

    const autoRedirection = (path) => {
        ClearToasts(dispatch);
        clearSelectedMessages();
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