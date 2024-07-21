import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from './useNotification';

export const useRedirection = () => {
    const navigate = useNavigate();
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { deletedMessages } = useSelector(store => store.firestoreStore);
    const { warningPageShowed, warningPageNeverShowCheck } = useSelector(store => store.appStore);
    const { openNotification } = useNotification();

    const messengerRedirection = () => {
        if (warningPageShowed || warningPageNeverShowCheck) {
            if (!user && !enterAsAGuest) {
                navigate("/auth", { replace: true });
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
        if (warningPageShowed || warningPageNeverShowCheck) {
            if (!user && !enterAsAGuest) {
                navigate("/auth", { replace: true });
            }
        } else {
            navigate("/warning", { replace: true });
        }
    };

    const trashRedirection = () => {
        if (enterAsAGuest) {
            openNotification("In order to use this feature you need to login.", false, "GUEST");
            navigate("/", { replace: true });
        } else if (!deletedMessages?.length) {
            navigate("/", { replace: true });
            openNotification("Trash is empty.", true, "ERROR");
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

            case '/auth':
                loginRedirection();
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