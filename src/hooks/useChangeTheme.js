import { useDispatch } from "react-redux";
import { setTheme } from "../redux/appSlice";
import { useNotification } from "./useNotification";

export const useChangeTheme = () => {
    const dispatch = useDispatch();
    const { openNotification } = useNotification();
    let themeLocalSotrage = localStorage.getItem("theme");

    const changeTheme = (themeNumber) => {
        dispatch(setTheme(themeNumber));
        localStorage.setItem("theme", themeNumber);
        document.documentElement.setAttribute('data-theme', themeNumber);
        openNotification("Background changed.", false, "BACKGROUND");
    };

    const setDefaultTheme = () => {
        if (themeLocalSotrage) {
            dispatch(setTheme(themeLocalSotrage));
            document.documentElement.setAttribute('data-theme', themeLocalSotrage);
        } else {
            dispatch(setTheme(2));
            localStorage.setItem("theme", 2);
            document.documentElement.setAttribute('data-theme', 2);
        }
    };

    return {
        changeTheme,
        setDefaultTheme
    };
};