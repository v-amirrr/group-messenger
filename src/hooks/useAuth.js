import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setUser, setLogin, setSignup, setEnterAsAGuest, setGoogleLogin } from '../redux/userSlice';
import { setNotificationStatus } from '../redux/appSlice';

export const useAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (email, password) => {
        dispatch(setLogin({ loading: true }));
        dispatch(setNotificationStatus({ show: false, message: null, isError: false }));

        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then(res => {
                    dispatch(setLogin({ loading: false }));
                    localStorage.setItem("user", JSON.stringify(res.user));
                    dispatch(setUser(res.user));
                    navigate("/");
                })
                .catch(err => {
                    dispatch(setLogin({ loading: false }));
                    dispatch(setNotificationStatus({ show: true, message: err.message, isError: true }));
                });
        } else {
            dispatch(setLogin({ loading: false }));
            dispatch(setNotificationStatus({ show: true, message: "Please fill all the inputs.", isError: true }));
        }
    };

    const signup = (username, email, password) => {
        dispatch(setSignup({ loading: true }));
        dispatch(setNotificationStatus({ show: false, message: null, isError: false }));

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
                    }).catch((err) => {
                        dispatch(setSignup({ loading: false }));
                        dispatch(setNotificationStatus({ show: true, message: err.message, isError: true }));
                    });
                })
                .catch((err) => {
                    dispatch(setSignup({ loading: false }));
                    dispatch(setNotificationStatus({ show: true, message: err.message, isError: true }));
                });
        } else {
            dispatch(setSignup({ loading: false }));
            dispatch(setNotificationStatus({ show: true, message: "Please fill all the inputs.", isError: true }));
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
        dispatch(setNotificationStatus({ show: false, message: null, isError: false }));

        signInWithPopup(auth, googleProvider)
            .then(res => {
                dispatch(setGoogleLogin({ loading: false }));
                localStorage.setItem("user", JSON.stringify(res.user));
                dispatch(setUser(res.user));
                navigate("/");
            })
            .catch(err => {
                dispatch(setGoogleLogin({ loading: false }));
                dispatch(setNotificationStatus({ show: true, message: err.message, isError: true }));
            });
    };

    return { login, signup, enterAsAGuest, logout, googleLogin };
};