import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db, googleProvider } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setUser, setEnterAsAGuest } from '../redux/userSlice';
import { setLoader } from '../redux/appSlice';
import { useNotification } from './useNotification';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { openNotification } = useNotification();

    const login = (email, password) => {
        dispatch(setLoader(true));
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then(res => {
                    dispatch(setLoader(false));
                    localStorage.setItem("user", JSON.stringify(res.user));
                    dispatch(setUser(res.user));
                    navigate("/");
                })
                .catch(err => {
                    dispatch(setLoader(false));
                    openNotification(err.message, "ERROR");
                });
        } else {
            dispatch(setLoader(false));
            openNotification("Please fill all the inputs", "ERROR");
        }
    };

    const signup = (username, email, password) => {
        dispatch(setLoader(true));
        if (username && email && password) {
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
                    openNotification(err.message, 'ERROR');
                });
        } else {
            dispatch(setLoader(false));
            openNotification('Please fill all the inputs', 'ERROR');
        }
    };

    const enterAsAGuest = () => {
        localStorage.setItem('guest-login', 'true');
        dispatch(setEnterAsAGuest(true));
        navigate('/', { replace: true });
    };

    const logout = () => {
        navigate('/login');
        dispatch(setUser(null));
        dispatch(setEnterAsAGuest(false));
        localStorage.removeItem('user');
        localStorage.removeItem('notification');
        localStorage.setItem('guest-login', 'false');
        setTimeout(() => {
            openNotification("You've logged out successfully", 'GENERAL');
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
                openNotification(err.message, 'ERROR');
            });
    };

    // const cancelAuth = () => {
    //     dispatch(setLogin({ loading: false }));
    //     dispatch(setSignup({ loading: false }));
    //     dispatch(setGoogleLogin({ loading: false }));
    //     localStorage.removeItem('user');
    //     dispatch(setUser(null));
    //     openNotification("Authentication got canceled", "GENERAL");
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
