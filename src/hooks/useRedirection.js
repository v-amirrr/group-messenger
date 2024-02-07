import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useRedirection = () => {
    const navigate = useNavigate();
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { warningPageShowed, warningPageNeverShowCheck } = useSelector(store => store.appStore);

    const messengerRedirection = () => {
        if (warningPageShowed || warningPageNeverShowCheck) {
            if (!user && !enterAsAGuest) {
                navigate("/login", { replace: true });
            }
        } else {
            navigate("/warning", { replace: true });
        }
    };

    const warningRedirection = () => {
        if (warningPageShowed || warningPageNeverShowCheck) {
            navigate("/", { replace: true });
        }
    };

    const loginRedirection = () => {
        if (warningPageShowed || warningPageNeverShowCheck) {
            if (user || enterAsAGuest) {
                navigate("/", { replace: true });
            }
        } else {
            navigate("/warning", { replace: true });
        }
    };

    const settingsRedirection = () => {
        console.log(!user && !enterAsAGuest);
        if (warningPageShowed || warningPageNeverShowCheck) {
            if (!user && !enterAsAGuest) {
                navigate("/login", { replace: true });
            }
        } else {
            navigate("/warning", { replace: true });
        }
    };

    const autoRedirection = (path) => {
        switch (path) {
            case '/':
                messengerRedirection();
                break;

            case '/warning':
                warningRedirection();
                break;

            case '/login':
                loginRedirection();
                break;

            case '/settings':
                settingsRedirection();
                break;

            default:
                break;
        }
    };

    return { autoRedirection };
};