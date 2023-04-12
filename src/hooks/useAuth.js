import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setUser, setLogin, setSignup, setEnterAsAGuest } from '../redux/userSlice';

export const useAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (email, password) => {
        dispatch(setLogin({ loading: true, error: null }));
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then(res => {
                    dispatch(setLogin({ loading: false, error: null }));
                    localStorage.setItem("user", JSON.stringify(res.user));
                    dispatch(setUser(res.user));
                    navigate("/");
                })
                .catch(err => {
                    dispatch(setLogin({ loading: false, error: err.message }));
                });
        } else {
            dispatch(setLogin({ loading: false, error: "Please fill all the inputs." }));
        }
    };

    const signup = (username, email, password) => {
        dispatch(setSignup({ loading: true, error: null }));

        if (username && email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    updateProfile(auth.currentUser, { displayName: username });
                    updateProfile(auth.currentUser, {
                        displayName: username,
                      }).then(() => {
                          dispatch(setSignup({ loading: false, error: null }));
                          localStorage.setItem("user", JSON.stringify(res.user));
                          dispatch(setUser(res.user));
                          navigate("/");
                      }).catch((err) => {
                        dispatch(setSignup({ loading: false, error: err.message }));
                      });
                })
                .catch((err) => {
                    dispatch(setSignup({ loading: false, error: err.message }));
                });
        } else {
            dispatch(setSignup({ loading: false, error: "Gotta fill all fields." }));
        }
    };

    const enterAsAGuest = () => {
        localStorage.setItem("guest-login", "true");
        dispatch(setEnterAsAGuest(true));
        navigate("/", { replace: true });
    };

    const clearAuthErrors = () => {
        dispatch(setLogin({ loading: false, error: null }));
        dispatch(setSignup({ loading: false, error: null }));
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.setItem("guest-login", "false");
        dispatch(setEnterAsAGuest(false));
        navigate("/enter");
    };

    return { login, signup, enterAsAGuest, clearAuthErrors, logout };
};