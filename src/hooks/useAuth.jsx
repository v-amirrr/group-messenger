import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db, googleProvider } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setUser, setEnterAsAGuest } from '../redux/userSlice';
import { setLoader } from '../redux/appSlice';
import { openToast } from '../functions/ToastHandler';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (email, password) => {
        dispatch(setLoader(true));
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                dispatch(setLoader(false));
                localStorage.setItem("user", JSON.stringify(res.user));
                dispatch(setUser(res.user));
                navigate("/");
            })
            .catch(err => {
                dispatch(setLoader(false));
                openToast(dispatch, err.message, "ERROR");
            });
    };

    const signup = (username, email, password) => {
        dispatch(setLoader(true));
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                updateProfile(auth.currentUser, {
                    displayName: username,
                })
                    .then(() => {
                        setDoc(doc(db, 'users', res.user.uid), {
                            username: username
                        });
                        dispatch(setLoader(false));
                        localStorage.setItem('user', JSON.stringify(res.user));
                        dispatch(setUser(res.user));
                        navigate('/');
                    })
            })
            .catch((err) => {
                dispatch(setLoader(false));
                openToast(dispatch, err.message, 'ERROR');
            });
    };

    const enterAsAGuest = () => {
        localStorage.setItem('guest-login', 'true');
        dispatch(setEnterAsAGuest(true));
        navigate('/', { replace: true });
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('guest-login');
        navigate('/auth');
        setTimeout(() => {
            dispatch(setUser(null));
            dispatch(setEnterAsAGuest(false));
            setTimeout(() => {
                openToast(dispatch, "You've logged out successfully", 'GENERAL');
            }, 200);
        }, 200);
    };

    const googleLogin = () => {
        dispatch(setLoader(true));
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                setDoc(doc(db, 'users', res.user.uid), {
                    username: res.user.displayName
                });
                dispatch(setLoader(false));
                localStorage.setItem('user', JSON.stringify(res.user));
                dispatch(setUser(res.user));
                navigate('/');
            })
            .catch((err) => {
                dispatch(setLoader(false));
                openToast(dispatch, err.message, 'ERROR');
            });
    };

    // const cancelAuth = () => {
    //     dispatch(setLogin({ loading: false }));
    //     dispatch(setSignup({ loading: false }));
    //     dispatch(setGoogleLogin({ loading: false }));
    //     localStorage.removeItem('user');
    //     dispatch(setUser(null));
    //     openToast(dispatch, "Authentication got canceled", "GENERAL");
    // };

    return {
        login,
        signup,
        enterAsAGuest,
        logout,
        googleLogin,
        // cancelAuth
    };
};
