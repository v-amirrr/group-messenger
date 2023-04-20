import { useDispatch } from "react-redux";
import { setTheme } from "../redux/userSlice";

export const useChangeTheme = () => {

    const dispatch = useDispatch();

    let themeLocalSotrage = localStorage.getItem("theme");

    const changeTheme = (themeNumber) => {
        dispatch(setTheme(themeNumber));
        localStorage.setItem("theme", themeNumber);
        document.documentElement.setAttribute('data-theme', themeNumber);
    };

    const setDefaultTheme = () => {
        if (themeLocalSotrage) {
            dispatch(setTheme(themeLocalSotrage));
            document.documentElement.setAttribute('data-theme', themeLocalSotrage);
        } else {
            dispatch(setTheme(4));
            localStorage.setItem("theme", 4);
            document.documentElement.setAttribute('data-theme', 4);
        }
    };

    return { changeTheme, setDefaultTheme };
};