import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from './useNotification';

export const useRedirection = () => {
    const navigate = useNavigate();
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { openNotification } = useNotification();

    const messengerRedirection = () => {
        if (!user && !enterAsAGuest) {
            navigate("/auth", { replace: true });
        }
    };

    const authRedirection = () => {
        if (localStorage.getItem('guest-login') || localStorage.getItem('user')) {
            console.log(localStorage.getItem('user'), localStorage.getItem('guest-login'));
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
            openNotification("To use this feature you need to ", "GUEST");
            navigate("/", { replace: true });
        }
    };

    const autoRedirection = (path) => {
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