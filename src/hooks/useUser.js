import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { setUser } from '../redux/userSlice';
import { useNotification } from "./useNotification";
import { useModal } from "./useModal";

export const useUser = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.userStore);
    const { openNotification } = useNotification();
    const { closeModal } = useModal();

    const changeUsername = async (newUsername) => {
        closeModal();
        await updateProfile(auth.currentUser, {
            displayName: newUsername,
        }).then(() => {
            updateDoc(doc(db, "users", auth.currentUser.uid), {
                username: newUsername
            });
            dispatch(setUser({ ...user, displayName: newUsername }));
            localStorage.setItem("user", JSON.stringify(user));
            openNotification("Username changed", "GENERAL");
        }).catch((err) => {
            openNotification(err.message, "ERROR");
        });
    };

    return { changeUsername };
};