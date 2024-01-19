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

    const showWarningPages = () => {
        if (warningPupupNeverShowLocalStorage) {
            sessionStorage.setItem("warning", "true");
            dispatch(setWarningShowed(true));
            dispatch(setWarningPageNeverShow(true));
        }

        if (!warningPupupSessionStorage && !warningPupupNeverShowLocalStorage) {
            navigate("/warning", { replace: true });
        } else if (!userLocalStorage && !guestNameLocalStorage) {
            navigate("/login", { replace: true });
        }
    };

    const warningPageSubmit = (warningToggle) => {
        sessionStorage.setItem("warning", "true");
        dispatch(setWarningShowed(true));
        if (!warningToggle) {
            localStorage.setItem("warning-check", "true");
        }
        if (!!localStorage.getItem("user")) {
            navigate("/", { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
    };

    return { showWarningPages, warningPageSubmit };
};