import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWarningShowed, setWarningPageNeverShow } from "../redux/appSlice";

export const useWarningPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const warningPageSubmit = (warningToggle) => {
        sessionStorage.setItem("warning", "true");
        dispatch(setWarningShowed(true));
        if (!warningToggle) {
            localStorage.setItem("warning-check", "true");
            dispatch(setWarningPageNeverShow(true));
        }
        if (!!localStorage.getItem("user")) {
            navigate("/", { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
    };

    return { warningPageSubmit };
};