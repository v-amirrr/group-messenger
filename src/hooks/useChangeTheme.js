import { useDispatch } from "react-redux";
import { setTheme } from "../redux/userSlice";
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
            dispatch(setTheme(4));
            localStorage.setItem("theme", 3);
            document.documentElement.setAttribute('data-theme', 3);
        }
    };

    return { changeTheme, setDefaultTheme };
};