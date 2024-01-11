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

    const changeUsername = async (newUsername, oldUsername, setLoading, setInputEnabled) => {
        if (newUsername && newUsername != oldUsername) {
            setLoading(true);
            await updateProfile(auth.currentUser, {
                displayName: newUsername,
            }).then(() => {
                dispatch(setUser({ ...user, displayName: newUsername}));
                updateDoc(doc(db, "users", auth.currentUser.uid), {
                    username: newUsername
                });
                openNotification("Username changed.", false, "USERNAME");
                setLoading(false);
                setInputEnabled(false)
            }).catch((err) => {
                openNotification(err.message, true, "ERROR");
                setLoading(false);
                setInputEnabled(false)
            });
        } else if (newUsername == oldUsername) {
            openNotification("The old and the new usernames are the same", true, "ERROR");
        } else {
            openNotification("Type a new username", true, "ERROR");
        }
    };

    return { changeUsername };
};