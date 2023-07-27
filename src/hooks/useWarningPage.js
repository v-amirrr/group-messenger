import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWarningShowed, setWarningPageNeverShow } from "../redux/appSlice";

export const useWarningPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let warningPupupSessionStorage = JSON.parse(sessionStorage.getItem("warning"));
    let warningPupupNeverShowLocalStorage = JSON.parse(localStorage.getItem("warning-check"));
    let guestNameLocalStorage = JSON.parse(localStorage.getItem("guest-name"));
    let userLocalStorage = JSON.parse(localStorage.getItem("user"));

    const showWelcomePages = () => {
        if (warningPupupNeverShowLocalStorage) {
            sessionStorage.setItem("warning", "true");
            dispatch(setWarningShowed(true));
            dispatch(setWarningPageNeverShow(true));
        }

        if (!warningPupupSessionStorage && !warningPupupNeverShowLocalStorage) {
            navigate("/warning", { replace: true });
        } else if (!userLocalStorage && !guestNameLocalStorage) {
            navigate("/enter", { replace: true });
        }
    };

    const warningPageSubmit = (warningModalCheckbox) => {
        sessionStorage.setItem("warning", "true");
        dispatch(setWarningShowed(true));
        if (warningModalCheckbox) {
            localStorage.setItem("warning-check", "true");
        }
        if (!!localStorage.getItem("user")) {
            navigate("/", { replace: true });
        } else {
            navigate("/enter", { replace: true });
        }
    };

    return { showWelcomePages, warningPageSubmit };
};