import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { setUser } from '../redux/userSlice';

export const useChangeUsername = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(store => store.userStore);
    const { messages } = useSelector(store => store.messagesStore);

    const changeUsername = async (newUsername) => {
        if (newUsername && newUsername != user.displayName) {
            await updateProfile(auth.currentUser, {
                displayName: newUsername,
            }).then(() => {
                dispatch(setUser({
                    ...user,
                    displayName: newUsername,
                }));
                messages.map(message => {
                    if (message.uid == user.uid) {
                        updateDoc(doc(db, "messages", message.id), {
                            username: newUsername
                        });
                    }
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    return { changeUsername };
};