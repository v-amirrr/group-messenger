import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db, googleProvider } from '../config/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setUser, setLogin, setSignup, setEnterAsAGuest, setGoogleLogin } from '../redux/userSlice';
import { useNotification } from './useNotification';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { openNotification } = useNotification();

    const login = (email, password) => {
        dispatch(setLogin({ loading: true }));
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
                    openNotification(err.message, true, "ERROR");
                });
        } else {
            dispatch(setLogin({ loading: false }));
            openNotification("Please fill all the inputs.", true, "ERROR");
        }
    };

    const signup = (username, email, password) => {
        dispatch(setSignup({ loading: true }));
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
                            dispatch(setSignup({ loading: false }));
                            localStorage.setItem('user', JSON.stringify(res.user));
                            dispatch(setUser(res.user));
                            navigate('/');
                        })
                })
                .catch((err) => {
                    dispatch(setSignup({ loading: false }));
                    openNotification(err.message, true, 'ERROR');
                });
        } else {
            dispatch(setSignup({ loading: false }));
            openNotification('Please fill all the inputs.', true, 'ERROR');
        }
    };

    const enterAsAGuest = () => {
        localStorage.setItem('guest-login', 'true');
        dispatch(setEnterAsAGuest(true));
        navigate('/', { replace: true });
    };

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('user');
        localStorage.removeItem('notification');
        localStorage.setItem('guest-login', 'false');
        setTimeout(() => {
            dispatch(setUser(null));
            dispatch(setEnterAsAGuest(false));
        }, 150);
    };

    const googleLogin = () => {
        dispatch(setGoogleLogin({ loading: true }));
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                setDoc(doc(db, 'users', res.user.uid), {
                    username: res.user.displayName
                });
                dispatch(setGoogleLogin({ loading: false }));
                localStorage.setItem('user', JSON.stringify(res.user));
                dispatch(setUser(res.user));
                navigate('/');
            })
            .catch((err) => {
                dispatch(setGoogleLogin({ loading: false }));
                openNotification(err.message, true, 'ERROR');
            });
    };

    const cancelAuth = () => {
        dispatch(setLogin({ loading: false }));
        dispatch(setSignup({ loading: false }))
        dispatch(setGoogleLogin({ loading: false }));;
        localStorage.removeItem('user');
        dispatch(setUser(null));
        openNotification("Authentication got canceled.", true, "ERROR");
    };

    return {
        login,
        signup,
        enterAsAGuest,
        logout,
        googleLogin,
        cancelAuth
    };
};
