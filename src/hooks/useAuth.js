import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setUser, setLogin, setSignup, setEnterAsAGuest, setGoogleLogin, setNotification } from '../redux/userSlice';

export const useAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (email, password) => {
        dispatch(setLogin({ loading: true }));
        dispatch(setNotification({ open: false, message: null, error: false }));

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
                    dispatch(setNotification({ open: true, message: err.message, error: true }));
                });
        } else {
            dispatch(setLogin({ loading: false }));
            dispatch(setNotification({ open: true, message: "Please fill all the inputs.", error: true }));
        }
    };

    const signup = (username, email, password) => {
        dispatch(setSignup({ loading: true }));
        dispatch(setNotification({ open: false, message: null, error: false }));

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
                        dispatch(setNotification({ open: true, message: err.message, error: true }));
                    });
                })
                .catch((err) => {
                    dispatch(setSignup({ loading: false }));
                    dispatch(setNotification({ open: true, message: err.message, error: true }));
                });
        } else {
            dispatch(setSignup({ loading: false }));
            dispatch(setNotification({ open: true, message: "Please fill all the inputs.", error: true }));
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
        localStorage.setItem("guest-login", "false");
        dispatch(setUser(null));
        dispatch(setEnterAsAGuest(false));
    };

    const googleLogin = () => {
        dispatch(setGoogleLogin({ loading: true }));
        dispatch(setNotification({ open: false, message: null, error: false }));

        signInWithPopup(auth, googleProvider)
            .then(res => {
                dispatch(setGoogleLogin({ loading: false }));
                localStorage.setItem("user", JSON.stringify(res.user));
                dispatch(setUser(res.user));
                navigate("/");
            })
            .catch(err => {
                dispatch(setSignup({ loading: false }));
                dispatch(setNotification({ open: true, message: err.message, error: true }));
            });
    };

    return { login, signup, enterAsAGuest, logout, googleLogin };
};