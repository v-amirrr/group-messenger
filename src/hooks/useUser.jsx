import { useDispatch, useSelector } from "react-redux";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { setUser } from '../redux/userSlice';
import { useToast } from "./useToast";
import { useModal } from "./useModal";

export const useUser = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.userStore);
    const { openToast } = useToast();
    const { closeModal } = useModal();

    const changeUsername = (newUsername) => {
        closeModal();
        updateDoc(doc(db, "users", user.uid), {
            username: newUsername
        }).then(() => {
            dispatch(setUser({ ...user, displayName: newUsername }));
            localStorage.setItem("user", JSON.stringify(user));
            openToast("Username was changed", "GENERAL");
        }).catch((err) => {
            openToast(err.message, "ERROR");
        });
    };

    return { changeUsername };
};