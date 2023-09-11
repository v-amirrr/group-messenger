import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setUser, setLogin, setSignup, setEnterAsAGuest, setGoogleLogin } from '../redux/userSlice';
import { useNotification } from "./useNotification";

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { openNotification, clearNotifications } = useNotification();

    const login = (email, password) => {
        dispatch(setLogin({ loading: true }));
        clearNotifications();

        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then(res => {
                    dispatch(setLogin({ loading: false }));
                    localStorage.setItem("user", JSON.stringify(res.user));
                    dispatch(setUser(res.user));
                    navigate("/");
                    openNotification(`Welcome ${res.user.displayName}`, false, "ENTER");
                })
                .catch(err => {
                    dispatch(setLogin({ loading: false }));
                    openNotification(err.message, true, "ERROR");
                });
        } else {
            dispatch(setLogin({ loading: false }));
            openNotification("Please fill all the inputs.", true, "ERROR");
        }
    };

    const signup = (username, email, password) => {
        dispatch(setSignup({ loading: true }));
        clearNotifications();

        if (username && email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    updateProfile(auth.currentUser, {
                        displayName: username,
                    }).then(() => {
                        dispatch(setSignup({ loading: false }));
                        localStorage.setItem("user", JSON.stringify(res.user));
                        dispatch(setUser(res.user));
                        navigate("/");
                        openNotification(`Welcome ${username}`, true, "ENTER");
                    }).catch((err) => {
                        dispatch(setSignup({ loading: false }));
                        openNotification(err.message, true, "ERROR");
                    });
                })
                .catch((err) => {
                    dispatch(setSignup({ loading: false }));
                    openNotification(err.message, true, "ERROR");
                });
        } else {
            dispatch(setSignup({ loading: false }));
            openNotification("Please fill all the inputs.", true, "ERROR");
        }
    };

    const enterAsAGuest = () => {
        localStorage.setItem("guest-login", "true");
        dispatch(setEnterAsAGuest(true));
        navigate("/", { replace: true });
    };

    const logout = () => {
        navigate("/enter");
        localStorage.removeItem("user");
        localStorage.removeItem("notification");
        localStorage.setItem("guest-login", "false");
        setTimeout(() => {
            dispatch(setUser(null));
            dispatch(setEnterAsAGuest(false));
        }, 300);
    };

    const googleLogin = () => {
        dispatch(setGoogleLogin({ loading: true }));
        clearNotifications();

        signInWithPopup(auth, googleProvider)
            .then(res => {
                dispatch(setGoogleLogin({ loading: false }));
                localStorage.setItem("user", JSON.stringify(res.user));
                dispatch(setUser(res.user));
                navigate("/");
                openNotification(`Welcome ${res.user.displayName}`, true, "ENTER");
            })
            .catch(err => {
                dispatch(setGoogleLogin({ loading: false }));
                openNotification(err.message, true, "ERROR");
            });
    };

    return { login, signup, enterAsAGuest, logout, googleLogin };
};