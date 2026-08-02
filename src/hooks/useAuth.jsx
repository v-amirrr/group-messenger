import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db, googleProvider } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setUser, setGuestLogin } from '../redux/userSlice';
import { setLoader } from '../redux/appSlice';
import { useToast } from './useToast';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { openToast } = useToast();

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
                openToast(err.message, "ERROR");
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
                openToast(err.message, 'ERROR');
            });
    };

    const guestLogin = () => {
        localStorage.setItem('guest-login', 'true');
        dispatch(setGuestLogin(true));
        navigate('/', { replace: true });
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('guest-login');
        navigate('/auth');
        setTimeout(() => {
            dispatch(setUser(null));
            dispatch(setGuestLogin(false));
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
                openToast(err.message, 'ERROR');
            });
    };

    return {
        login,
        signup,
        guestLogin,
        logout,
        googleLogin,
    };
};
