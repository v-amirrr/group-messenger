import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWarningShow, setWarningPageNeverShowCheck } from "../redux/userSlice";

export const useWarningPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let warningPupupSessionStorage = JSON.parse(sessionStorage.getItem("warning"));
    let warningPupupNeverShowLocalStorage = JSON.parse(localStorage.getItem("warning-check"));
    let loginAsGuestLocalStorage = JSON.parse(localStorage.getItem("guest-login"));
    let usernameLocalStorage = JSON.parse(localStorage.getItem("username"));

    const showWelcomePages = () => {
        if (warningPupupNeverShowLocalStorage) {
            sessionStorage.setItem("warning", "true");
            dispatch(setWarningShow(true));
            dispatch(setWarningPageNeverShowCheck(true));
        }

        if (!warningPupupSessionStorage && !warningPupupNeverShowLocalStorage) {
            navigate("/warning", { replace: true });
        } else if (!usernameLocalStorage && !loginAsGuestLocalStorage) {
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