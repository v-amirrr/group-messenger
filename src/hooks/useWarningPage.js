import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWarningShow } from "../redux/userSlice";

export const useWarningPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let warningPupupSessionStorage = sessionStorage.getItem("warning");
    let warningPupupNeverShowLocalStorage = localStorage.getItem("warning-check");
    let usernameLocalStorage = localStorage.getItem("username");

    const showWelcomePages = () => {
        if (!warningPupupSessionStorage && !warningPupupNeverShowLocalStorage) {
            navigate("/warning", { replace: true });
        } else if (!usernameLocalStorage) {
            navigate("/login", { replace: true });
        }
    };

    const warningPageSubmit = (warningModalCheckbox) => {
        sessionStorage.setItem("warning", "true");
        dispatch(setWarningShow(true));
        if (warningModalCheckbox) {
            localStorage.setItem("warning-check", "true");
        }
        if (!!localStorage.getItem("username")) {
            navigate("/", { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
    };

    return { showWelcomePages, warningPageSubmit };
};