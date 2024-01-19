import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useRedirection = () => {
    const navigate = useNavigate();
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { warningPageShowed, warningPageNeverShowCheck } = useSelector(store => store.appStore);

    const authRedirection = () => {
        if (user || enterAsAGuest) {
            navigate("/", { replace: true });
        }
    };

    const groupChatRedirection = () => {
        if (!user && !enterAsAGuest) {
            navigate("/login", { replace: true });
        }
    };

    const warningRedirection = () => {
        if (warningPageShowed || warningPageNeverShowCheck) {
            navigate("/", { replace: true });
        }
    };

    return { authRedirection, groupChatRedirection, warningRedirection };
};