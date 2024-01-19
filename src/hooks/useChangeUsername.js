import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { setUser } from '../redux/userSlice';
import { useNotification } from "./useNotification";

export const useChangeUsername = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.userStore);
    const { openNotification } = useNotification();

    const changeUsername = async (newUsername, oldUsername, setLoading, closeUserSettings) => {
        if (newUsername && newUsername != oldUsername) {
            setLoading(true);
            await updateProfile(auth.currentUser, {
                displayName: newUsername,
            }).then(() => {
                updateDoc(doc(db, "users", auth.currentUser.uid), {
                    username: newUsername
                });
                dispatch(setUser({ ...user, displayName: newUsername}));
                localStorage.setItem("user", JSON.stringify(user));
                openNotification("Username changed.", false, "USERNAME");
                closeUserSettings();
            }).catch((err) => {
                openNotification(err.message, true, "ERROR");
                setLoading(false);
                closeUserSettings();
            });
        } else if (newUsername == oldUsername) {
            openNotification("The old and the new usernames are the same", true, "ERROR");
        } else {
            openNotification("Type a new username", true, "ERROR");
        }
    };

    return { changeUsername };
};