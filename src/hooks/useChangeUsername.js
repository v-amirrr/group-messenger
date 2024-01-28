import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { setUser } from '../redux/userSlice';
import { useNotification } from "./useNotification";
import { useMessageOptions } from "./useMessageOptions";

export const useChangeUsername = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.userStore);
    const { openNotification } = useNotification();
    const { closePopup } = useMessageOptions();

    const changeUsername = async (newUsername, setLoading, closeUserSettings) => {
        closePopup();
        // setLoading(true);
        await updateProfile(auth.currentUser, {
            displayName: newUsername,
        }).then(() => {
            updateDoc(doc(db, "users", auth.currentUser.uid), {
                username: newUsername
            });
            dispatch(setUser({ ...user, displayName: newUsername }));
            localStorage.setItem("user", JSON.stringify(user));
            openNotification("Username changed.", false, "USERNAME");
            // closeUserSettings();
        }).catch((err) => {
            openNotification(err.message, true, "ERROR");
            // setLoading(false);
            // closeUserSettings();
        });
    };

    return { changeUsername };
};