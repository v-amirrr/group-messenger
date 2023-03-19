import { useDispatch } from "react-redux";
import { setTheme } from "../redux/userSlice";

export const useChangeTheme = () => {

    const dispatch = useDispatch();

    let themeLocalSotrage = localStorage.getItem("theme");

    const changeTheme = (themeNumber) => {
        dispatch(setTheme(themeNumber));
        localStorage.setItem("theme", themeNumber);
    };

    const setDefaultTheme = () => {
        if (themeLocalSotrage) {
            dispatch(setTheme(themeLocalSotrage));
        } else {
            dispatch(setTheme(6));
            localStorage.setItem("theme", 6);
        }
    };

    return { changeTheme, setDefaultTheme };
};