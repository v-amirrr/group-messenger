import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoginAsGuest, setLoginError } from "../redux/userSlice";
import { setLocalUsername } from "../redux/messagesSlice";

export const useLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { messages } = useSelector(store => store.messagesStore);
    const { loginError } = useSelector(store => store.userStore);

    const login = (loginInput) => {
        dispatch(setLoginError(null));

        let sameName = false;

        if (messages?.length) {
            messages.map(message => {
                if (message?.username?.toLowerCase() == loginInput?.toLowerCase()) {
                    sameName = true;
                }
            });

            if (!sameName) {
                localStorage.setItem("username", JSON.stringify(loginInput));
                dispatch(setLocalUsername(loginInput));
                navigate("/", { replace: true });
            } else {
                dispatch(setLoginError("The name you chose is already taken by someone else. Please choose another name."));
            }
        } else {
            dispatch(setLoginError("There's a problem in your connection. If you're in sanctioned countries like Iran, you have to use VPN. If you're already using VPN please use another VPN (also you can use shecan.ir)."));
        }

        if (loginError) {      
            setTimeout(() => {
                dispatch(setLoginError(null));
            }, 8000);
        }
    };

    const clearLoginErorrs = () => {
        dispatch(setLoginError(null));
    };

    const loginAsGuest = () => {
        dispatch(setLoginAsGuest());
        navigate("/", { replace: true });
    };

    return { login, clearLoginErorrs, loginAsGuest };
};