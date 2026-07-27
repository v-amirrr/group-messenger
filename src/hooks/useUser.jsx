import { useDispatch, useSelector } from "react-redux";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { setUser } from '../redux/userSlice';
import { useModal } from "./useModal";
import { useToast } from './useToast';

export const useUser = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.userStore);
    const { closeModal } = useModal();
    const { openToast } = useToast();

    const changeUsername = (newUsername) => {
        closeModal();
        updateDoc(doc(db, "users", user.uid), {
            username: newUsername
        }).then(() => {
            dispatch(setUser({ ...user, displayName: newUsername }));
            openToast("Username was changed", "GENERAL");
        }).catch((err) => {
            openToast(err.message, "ERROR");
        });
    };

    return { changeUsername };
};