import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from './useNotification';

export const useRedirection = () => {
    const navigate = useNavigate();
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { deletedMessages } = useSelector(store => store.firestoreStore);
    const { openNotification } = useNotification();

    const messengerRedirection = () => {
        if (!user && !enterAsAGuest) {
            navigate("/auth", { replace: true });
        }
    };

    const loginRedirection = () => {
        if (user || enterAsAGuest) {
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