import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from './useToast';

export const useRedirection = () => {
    const navigate = useNavigate();
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { openToast, clearToasts } = useToast();

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
            openToast("To use this feature you need to ", "GUEST");
            navigate("/", { replace: true });
        }
    };

    const autoRedirection = (path) => {
        clearToasts();
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