import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useRedirection = () => {

    const navigate = useNavigate();
    const { user, enterAsAGuest, warningPageShowed, warningPageNeverShowCheck } = useSelector(store => store.userStore);

    const authRedirection = () => {
        if (user || enterAsAGuest) {
            navigate("/", { replace: true });
        }
    };

    const groupChatRedirection = () => {
        if (!user && !enterAsAGuest) {
            navigate("/enter", { replace: true });
        }
    };

    const warningRedirection = () => {
        if (warningPageShowed || warningPageNeverShowCheck) {
            navigate("/", { replace: true });
        }
    };

    return { authRedirection, groupChatRedirection, warningRedirection };
};